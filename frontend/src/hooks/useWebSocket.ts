import { useState, useEffect, useCallback, useRef } from 'react';

interface WebSocketMessage {
  type: string;
  data?: any;
  timestamp?: number;
  [key: string]: any;
}

export function useWebSocket(url: string, shouldConnect: boolean = true) {
  const [data, setData] = useState<WebSocketMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const send = useCallback((message: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    if (!shouldConnect) return;

    try {
      const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:5000'}${url}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setData(message);
        } catch (err) {
          console.error('Failed to parse WS message:', err);
        }
      };

      ws.onerror = () => {
        setError('WebSocket connection error');
      };

      ws.onclose = () => {
        setIsConnected(false);
      };

      wsRef.current = ws;

      return () => {
        ws.close();
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    }
  }, [url, shouldConnect]);

  return { data, isConnected, error, send };
}
