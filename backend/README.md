# 🚀 YallaGoal - Backend

A real-time football API server built with Node.js, Express, and WebSocket.

## 📋 Features

- ✅ REST API endpoints for matches, leagues, teams, and news
- ✅ Real-time WebSocket broadcasting
- ✅ Mock data service (ready to integrate with real APIs)
- ✅ Health check & admin monitoring
- ✅ Graceful error handling
- ✅ CORS support for frontend

## 🔧 Tech Stack

- **Node.js** + TypeScript
- **Express.js** - REST API framework
- **WebSocket (ws)** - Real-time communication
- **Axios** - HTTP client for external APIs
- **UUID** - Unique ID generation
- **Dotenv** - Environment configuration

## 📦 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
API_POLL_INTERVAL=5000
FOOTBALL_API_KEY=your_api_key_here
FOOTBALL_API_BASE_URL=https://api.football-data.org/v4
```

## 🚀 Running the Server

**Development mode (with hot reload):**

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Matches

```
GET  /api/matches?day=today|yesterday|tomorrow
GET  /api/matches/:id
GET  /api/matches/:id/events
```

### Leagues

```
GET  /api/leagues
GET  /api/leagues/:id
```

### Teams

```
GET  /api/teams
GET  /api/teams/:id
```

### News

```
GET  /api/news
GET  /api/news/:id
```

### Health Check

```
GET  /health
GET  /admin/stats
```

## 🔌 WebSocket Events

Connect to WebSocket at `ws://localhost:5000/ws`

### Subscribe to match updates:

```json
{
  "type": "subscribe",
  "data": {
    "channel": "match_123"
  }
}
```

### Incoming events:

```json
{
  "type": "match_update",
  "data": {
    "matchId": "match_123",
    "homeScore": 2,
    "awayScore": 1,
    "minute": 45
  },
  "timestamp": 1234567890
}
```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── server.ts           # Main entry point
│   ├── config/
│   │   └── index.ts        # Configuration
│   ├── routes/
│   │   └── api.ts          # REST endpoints
│   ├── services/
│   │   └── mockDataService.ts
│   ├── sockets/
│   │   └── socketManager.ts # WebSocket handling
│   └── types/
│       └── index.ts        # TypeScript types
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

## 🔄 How It Works

1. **REST API** - Frontend requests data via REST endpoints
2. **Mock Data Service** - Simulates real API responses
3. **WebSocket** - Server broadcasts real-time updates to connected clients
4. **Polling** - Backend polls for updates and broadcasts changes
5. **Broadcasting** - All connected clients receive updates

## 🎯 Integration with Real API

To integrate with a real football API (e.g., api-football.com):

1. Update `src/services/mockDataService.ts` to call real APIs
2. Add API credentials to `.env`
3. Implement polling logic to fetch live data
4. Broadcast updates via WebSocket to clients

## 📊 Admin Dashboard

Access admin stats at: `http://localhost:5000/admin/stats`

Returns:
- Connected WebSocket clients count
- Active subscriptions
- Server uptime
- Environment info

## 🛠️ Development

- Add new routes in `src/routes/api.ts`
- Add new types in `src/types/index.ts`
- Modify mock data in `src/services/mockDataService.ts`
- Handle WebSocket logic in `src/sockets/socketManager.ts`

## 📝 Notes

- All responses are JSON formatted
- Timestamps are in ISO 8601 format
- Data changes are broadcasted in real-time via WebSocket
- Mock data simulates live match updates every 5-20 seconds

---

**Made with ❤️ for YallaGoal**
