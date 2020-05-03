const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(3000, () => {
    console.log("Listening On Port 3000.");
})

app.use(express.static(__dirname + "/public"));

var line_history = [];

io.on('connection', (socket) => { 
    for (var i in line_history) {
        socket.emit('draw_line', {line: line_history[i]});
    }
    socket.on('draw_line', (data) => {
        line_history.push(data.line);
        io.emit('draw_line', {line: data.line});
    })
})