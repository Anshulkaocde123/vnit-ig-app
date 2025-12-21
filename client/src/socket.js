import { io } from 'socket.io-client';

// Use relative connection for same-origin, works for both dev and production
const SOCKET_URL = import.meta.env.VITE_API_URL || window.location.origin;

export const socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;
