import { Server } from 'socket.io';
import express from 'express';
import http from 'http';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

/* io.use((socket, next) => {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) return next(new Error('Sin cookies'));

    const parsed = cookie.parse(cookies);
    const token = parsed.jwt;

    if (!token) return next(new Error('Token no encontrado'));

    try {
        const decoded = jwt.verify(token, 'privatekey');
        socket.user = decoded;
        next();
    } catch (err) {
        next(new Error('Token inválido'));
    }
});

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");

    const userId = socket.user.id;
    console.log(userId);

    socket.join(`usuario_${userId}`);

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

    socket.on("nuevaNotificacion", (data) => {
        console.log('funca');
    });

    socket.on("message", (data) => {
        console.log("Mensaje recibido:", data);
        io.emit("message", data);
    });
}); */