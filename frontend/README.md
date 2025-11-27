# 🎨 YallaGoal - Frontend

A beautiful, real-time football dashboard built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- ✅ Real-time match updates via WebSocket
- ✅ Beautiful Arabic-first UI with RTL support
- ✅ Dark/Light theme toggle with persistence
- ✅ Responsive mobile-first design
- ✅ Animated components with Framer Motion
- ✅ Live match cards with score updates
- ✅ Match details with lineups and events
- ✅ League browser and standings
- ✅ News section
- ✅ Admin dashboard
- ✅ Zero page reloads (SPA)

## 🔧 Tech Stack

- **React 18** + TypeScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Cairo/Tajawal** - Arabic fonts

## 📦 Installation

```bash
cd frontend
npm install
```

## ⚙️ Configuration

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
```

## 🚀 Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── MatchCard.tsx
│   │   ├── EventsTimeline.tsx
│   │   ├── LineupPitch.tsx
│   │   ├── NewsCard.tsx
│   │   ├── LeagueCard.tsx
│   │   ├── Tabs.tsx
│   │   └── Skeleton.tsx
│   ├── pages/                # Page components
│   │   ├── HomePage.tsx
│   │   ├── MatchDetailsPage.tsx
│   │   ├── LeaguesPage.tsx
│   │   ├── TeamsPage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── NewsDetailPage.tsx
│   │   └── AdminPage.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useWebSocket.ts
│   │   └── useMediaQuery.ts
│   ├── services/             # API services
│   │   └── apiService.ts
│   ├── context/              # State management
│   │   ├── themeStore.ts
│   │   └── dataStore.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # Vite environment types
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🎨 Customization

### Theme
- Theme configuration: `tailwind.config.js`
- Theme store: `src/context/themeStore.ts`
- Global styles: `src/index.css`

### Colors
- Primary: Slate palette
- Accent: Red (#ef4444)
- Dark mode: Fully supported

### Fonts
- Arabic: Cairo & Tajawal (from Google Fonts)
- RTL layout: Automatic with Tailwind
- Direction: Applied globally

### Components
- All components support dark mode
- Animations use Framer Motion
- Responsive design with Tailwind breakpoints

## 🔌 WebSocket Integration

The app automatically connects to WebSocket and:

1. **On Home Page** - Subscribes to all matches updates
2. **On Match Details** - Subscribes to specific match events
3. **Real-time Updates** - Automatically updates UI when data changes

Example WebSocket hook usage:

```typescript
const { data, isConnected, error, send } = useWebSocket('/ws/matches', true);
```

## 🎯 Key Components

### MatchCard
Displays live match information with:
- Team logos and names
- Current score
- Live badge with animations
- Match status (live/scheduled/finished)
- League and venue info

### EventsTimeline
Shows match events in chronological order:
- Goals with assists
- Yellow/Red cards
- Substitutions
- Match timeline

### LineupPitch
Visualizes player positions on field:
- Formation display
- Player ratings
- Animated entrance
- Color-coded teams

### Navbar
Features:
- Logo and branding
- Theme toggle
- Mobile-responsive menu
- RTL-aware

## 🌍 Internationalization

- All UI text is in Arabic
- RTL (Right-to-Left) layout
- Arabic font stack fallback
- Locale-aware date formatting

## 🎬 Animations

Powered by Framer Motion:
- Card hover effects
- Page transitions
- Score change animations
- Event timeline slide-ins
- Smooth theme transitions

## 📊 State Management

Uses Zustand for:
- Theme persistence
- Match data caching
- Selected match tracking
- Global app state

## 🚨 Error Handling

- API errors are caught and displayed
- Fallback UI for missing data
- Retry mechanisms
- Graceful degradation

## 🔐 Performance

- Code splitting with React.lazy()
- Image optimization
- Efficient re-renders
- WebSocket connection pooling

## 🛠️ Development Tips

1. **Hot Module Replacement** - Changes auto-apply
2. **DevTools** - React DevTools supported
3. **Console** - Check browser console for errors
4. **Network Tab** - Monitor API calls and WebSocket

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🐛 Troubleshooting

### WebSocket not connecting
- Check backend is running on port 5000
- Check `VITE_WS_URL` in `.env.local`
- Check browser console for errors

### Theme not persisting
- Clear localStorage and refresh
- Check browser's localStorage is enabled

### Images not loading
- Check image URLs are accessible
- Verify placeholder service (placeholder.com)

---

**Made with ❤️ for YallaGoal**
