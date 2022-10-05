

const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        const packet = {
            id: socket.id.substring(0,2),
            date: new Date().toLocaleTimeString() + " : " + new Date().toLocaleDateString(),
            text: message};
        console.log(message);
        io.emit('message', packet);   
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));
