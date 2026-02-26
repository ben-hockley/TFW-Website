#include <LiquidCrystal.h>

// LCD PINS
LiquidCrystal lcd(12, 11, 13, 10, 3, 2);

// ULTRASONIC PINS
const int trigA = 5;
const int echoA = 4;
const int trigB = 6;
const int echoB = 7;

// SETTINGS
const int nearTh = 10;      // Distance to trigger (cm)
const int farTh  = 14;      // Distance considered clear (hysteresis)
const int timeout = 1000;   // Max time allowed to pass (ms)
const int lockoutMs = 300;  // Extra delay before allowing new count

int carriageCount = 0;

// STATE MACHINE
enum State { IDLE, WAIT_B_AFTER_A, WAIT_A_AFTER_B, LOCKOUT };
State state = IDLE;

unsigned long stateStart = 0;

// -------------------- SETUP --------------------
void setup() {
  lcd.begin(16, 2);

  pinMode(trigA, OUTPUT);
  pinMode(echoA, INPUT);
  pinMode(trigB, OUTPUT);
  pinMode(echoB, INPUT);

  lcd.print("Train Carriage");
  delay(1000);
  updateDisplay();
}

// -------------------- DISTANCE FUNCTION --------------------
long getDistance(int trig, int echo) {
  digitalWrite(trig, LOW);
  delayMicroseconds(2);

  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  long duration = pulseIn(echo, HIGH, 20000);

  if (duration == 0) return 999;  // No reading

  return duration * 0.034 / 2;
}

// Median of 3 readings to remove random spikes
int getDistanceFiltered(int trig, int echo) {
  int a = getDistance(trig, echo);
  delay(15);
  int b = getDistance(trig, echo);
  delay(15);
  int c = getDistance(trig, echo);

  if ((a <= b && b <= c) || (c <= b && b <= a)) return b;
  if ((b <= a && a <= c) || (c <= a && a <= b)) return a;
  return c;
}

bool isNear(int d) { return d <= nearTh; }
bool isFar(int d)  { return d >= farTh; }

// -------------------- LOOP --------------------
void loop() {

  int distA = getDistanceFiltered(trigA, echoA);
  delay(35); // Prevent ultrasonic cross-talk
  int distB = getDistanceFiltered(trigB, echoB);

  unsigned long now = millis();

  switch (state) {

    case IDLE:
      if (isNear(distA) && isFar(distB)) {
        state = WAIT_B_AFTER_A;
        stateStart = now;
      }
      else if (isNear(distB) && isFar(distA)) {
        state = WAIT_A_AFTER_B;
        stateStart = now;
      }
      break;

    case WAIT_B_AFTER_A:
      if (now - stateStart > timeout) {
        state = IDLE;
        break;
      }
      if (isNear(distB)) {
        carriageCount++;
        updateDisplay();
        state = LOCKOUT;
        stateStart = now;
      }
      break;

    case WAIT_A_AFTER_B:
      if (now - stateStart > timeout) {
        state = IDLE;
        break;
      }
      if (isNear(distA)) {
        if (carriageCount > 0) carriageCount--;
        updateDisplay();
        state = LOCKOUT;
        stateStart = now;
      }
      break;

    case LOCKOUT:
      if ((now - stateStart > lockoutMs) &&
          isFar(distA) && isFar(distB)) {
        state = IDLE;
      }
      break;
  }
}

// -------------------- LCD UPDATE --------------------
void updateDisplay() {
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Passengers: ");
  lcd.print(carriageCount);

  lcd.setCursor(0, 1);
  if (carriageCount > 10) {
    lcd.print("STATUS: FULL");
  } else {
    lcd.print("STATUS: Space");
  }
}