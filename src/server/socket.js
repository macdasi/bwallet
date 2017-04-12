/**
 * Created by hadar.m on 12/04/2017.
 */
var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

let http = require('http').Server(app);
let io = require('socket.io')(http);

let connections = [];

io.on('connection', (socket) => {
    console.log('user connected');
    if(connections.length > 0){
        io.emit('message', {type:'peer-connection', ids : connections});
    }
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        if(connections.indexOf(message) == -1 && message != ''){
            connections.push(message);
            io.emit('message', {type:'peer-connection', ids : connections});
        }

    });
});

http.listen(6666, () => {
    console.log('started on port 6666');
});