import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import apiRoutes from '@/routes/api.js';
import { SocketManager } from '@/sockets/socketManager.js';
import { config } from '@/config/index.js';

const app = express();
const server = createServer(app);
const socketManager = new SocketManager(server);

// Middleware
app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Admin stats
app.get('/admin/stats', (req, res) => {
  const stats = socketManager.getStats();
  res.json({
    ...stats,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// API Routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
server.listen(config.port, () => {
  console.log(`🚀 YallaGoal Backend running on http://localhost:${config.port}`);
  console.log(`📡 WebSocket available at ws://localhost:${config.port}`);
  console.log(`📊 Admin stats at http://localhost:${config.port}/admin/stats`);
  console.log(`Environment: ${config.nodeEnv}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  socketManager.close();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export { app, server, socketManager };
