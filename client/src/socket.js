import { io } from 'socket.io-client';

// Use relative connection for same-origin, works for both dev and production
const SOCKET_URL = import.meta.env.VITE_API_URL || window.location.origin;

export const socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    connectTimeout: 45000,
    transports: ['websocket', 'polling'],
    withCredentials: true,
    upgrade: true
});

// Connection event handlers
socket.on('connect', () => {
    console.log('✅ Socket.io connected:', socket.id);
});

socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
    console.warn('⚠️  Socket disconnected:', reason);
});

socket.on('error', (error) => {
    console.error('❌ Socket error:', error);
});

export default socket;
