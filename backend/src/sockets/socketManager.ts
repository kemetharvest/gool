import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import type { WebSocketMessage } from '@/types/index.js';
import { mockDataService } from '@/services/mockDataService.js';
import { v4 as uuidv4 } from 'uuid';

interface Client {
  ws: WebSocket;
  id: string;
  subscriptions: Set<string>;
}

export class SocketManager {
  private wss: WebSocketServer;
  private clients: Map<string, Client> = new Map();
  private matchUpdaters: Map<string, NodeJS.Timeout> = new Map();
  private broadcastInterval: NodeJS.Timeout | null = null;

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });
    this.setupConnections();
    this.startBroadcasting();
  }

  private setupConnections() {
    this.wss.on('connection', (ws: WebSocket) => {
      const clientId = uuidv4();
      const client: Client = {
        ws,
        id: clientId,
        subscriptions: new Set(),
      };

      this.clients.set(clientId, client);
      console.log(`Client connected: ${clientId}`);

      ws.on('message', (message: string) => {
        try {
          const data: WebSocketMessage = JSON.parse(message);
          this.handleMessage(clientId, data);
        } catch (error) {
          ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      });

      ws.on('close', () => {
        this.clients.delete(clientId);
        console.log(`Client disconnected: ${clientId}`);
      });

      ws.on('error', (error) => {
        console.error(`WebSocket error for ${clientId}:`, error);
      });
    });
  }

  private handleMessage(clientId: string, message: WebSocketMessage) {
    const client = this.clients.get(clientId);
    if (!client) return;

    switch (message.type) {
      case 'subscribe':
        if (message.data.channel) {
          client.subscriptions.add(message.data.channel);
          this.startMatchUpdater(message.data.channel);
          client.ws.send(
            JSON.stringify({
              type: 'subscribed',
              channel: message.data.channel,
            })
          );
        }
        break;

      case 'unsubscribe':
        if (message.data.channel) {
          client.subscriptions.delete(message.data.channel);
        }
        break;
    }
  }

  private startMatchUpdater(matchId: string) {
    if (this.matchUpdaters.has(matchId)) return;

    const updater = setInterval(() => {
      // Simulate random score changes
      if (Math.random() > 0.9) {
        const match = mockDataService.getMatch(matchId).then((m) => {
          if (m && m.status === 'inprogress' && m.minute < 90) {
            const homeScore = Math.random() > 0.5 ? m.homeScore + 1 : m.homeScore;
            const awayScore = Math.random() > 0.5 ? m.awayScore + 1 : m.awayScore;
            const minute = Math.min(m.minute + 1, 90);

            mockDataService.simulateMatchUpdate(matchId, {
              home: homeScore,
              away: awayScore,
              minute,
            });

            this.broadcast({
              type: 'match_update',
              data: {
                matchId,
                homeScore,
                awayScore,
                minute,
              },
              timestamp: Date.now(),
            });
          }
        });
      }
    }, 5000);

    this.matchUpdaters.set(matchId, updater);
  }

  private startBroadcasting() {
    this.broadcastInterval = setInterval(async () => {
      const allMatches = [
        ...(await mockDataService.getMatches('today')),
        ...(await mockDataService.getMatches('tomorrow')),
      ];

      this.broadcast({
        type: 'matches_broadcast',
        data: allMatches,
        timestamp: Date.now(),
      });
    }, 15000);
  }

  private broadcast(message: WebSocketMessage) {
    const payload = JSON.stringify(message);
    this.clients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        // Broadcast to all connected clients
        client.ws.send(payload);
      }
    });
  }

  broadcastMatchEvent(matchId: string, event: any) {
    const payload = JSON.stringify({
      type: 'match_event',
      matchId,
      event,
      timestamp: Date.now(),
    });

    this.clients.forEach((client) => {
      if (
        client.ws.readyState === WebSocket.OPEN &&
        client.subscriptions.has(matchId)
      ) {
        client.ws.send(payload);
      }
    });
  }

  getStats() {
    return {
      connectedClients: this.clients.size,
      activeSubscriptions: this.matchUpdaters.size,
    };
  }

  close() {
    this.wss.close();
    this.clients.forEach((client) => client.ws.close());
    if (this.broadcastInterval) clearInterval(this.broadcastInterval);
    this.matchUpdaters.forEach((updater) => clearInterval(updater));
  }
}
