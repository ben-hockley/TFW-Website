// requirements: https://github.com/untr0py/SevSeg
#include "SevSeg.h"
SevSeg sevseg;

const int seatPins[] = {
  A0, A1, A2, A3, A4, A5
};

void setup() {
  for (int thisPin = 0; thisPin < 6; thisPin++){
    pinMode(seatPins[thisPin], INPUT_PULLUP);
  }

  byte numDigits = 4;  
  byte digitPins[] = {2, 3, 4, 5};
  byte segmentPins[] = {6, 7, 8, 9, 10, 11, 12, 13};
  bool resistorsOnSegments = false; 
  bool disableDecPoint = true;
  sevseg.begin(COMMON_CATHODE, numDigits, digitPins, segmentPins, resistorsOnSegments);
  sevseg.setBrightness(90);
}

void loop() {
  int occupiedChairs = 0;

  for (int thisPin = 0; thisPin < 6; thisPin++){
    int thisSeatState = digitalRead(seatPins[thisPin]);
    if (thisSeatState == LOW){
      occupiedChairs = occupiedChairs + 1;
    }
  }

  sevseg.setNumber(occupiedChairs);
  sevseg.refreshDisplay();
}