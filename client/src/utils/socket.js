// utils/socket.js
import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'], // forces pure WebSocket (no polling)
  withCredentials: true
});

 