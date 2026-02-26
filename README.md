# TFW Companion App

This Companion App is part of Group 3's solution for the Emerging Tech hackathon.

The companion app connects to the IoT network of the train, to show where seats are available, and what types of seat are available (e.g. phone charger, accessible seat, table seat etc.)

---

## Running the App Locally

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** 9+

### Setup

```bash
# Navigate to the app directory
cd tfw-seat-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

### Production Build

```bash
cd tfw-seat-app
npm run build
npm start
```

### Project Structure

```
tfw-seat-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with TfW branding
│   │   ├── page.tsx                # Station selector (home)
│   │   ├── station/
│   │   │   └── [stationCode]/
│   │   │       └── page.tsx        # Upcoming departures
│   │   ├── train/
│   │   │   └── [serviceId]/
│   │   │       └── page.tsx        # Train seat map
│   │   └── ticket/
│   │       └── [serviceId]/
│   │           └── page.tsx        # Ticket purchase + mock payment
│   ├── components/
│   │   ├── CountdownTimer.tsx
│   │   ├── DepartureCard.tsx
│   │   ├── TrainHeader.tsx
│   │   ├── CoachSelector.tsx
│   │   ├── SeatMap.tsx
│   │   ├── Seat.tsx
│   │   ├── SeatInfoModal.tsx
│   │   ├── SeatSummaryPanel.tsx
│   │   ├── PlatformZoneBadge.tsx
│   │   ├── TicketSummaryCard.tsx
│   │   ├── PaymentButtons.tsx
│   │   ├── PaymentSuccessAnimation.tsx
│   │   └── ui/                     # shadcn/ui components
│   └── lib/
│       ├── mockData.ts             # Mock data layer
│       ├── types.ts                # TypeScript interfaces
│       ├── stationContext.tsx       # React context for station state
│       └── utils.ts                # Utility functions
└── package.json
```

### Tech Stack

- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS** with Transport for Wales brand colours
- **shadcn/ui** for UI components
- **React Context** for station state management
