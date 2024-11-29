// app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');
    
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Emitir el mensaje a todos los clientes conectados
    });
});

server.listen(3000, () => {
    console.log('Servidor de chat en http://localhost:3000');
});
