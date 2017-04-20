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
    socket.emit('message', {type:'connected'});
    socket.emit('message', {type:'nodes', ids : connections});


    if(connections.length > 0){
        io.emit('message', {type:'nodes', ids : connections});
        console.log(connections);
    }

    socket.on('disconnect', function(){
        var i = connections.indexOf(socket.peerId);

        if( i > -1){
            var id = connections[i];
            connections.splice(i, 1);
            console.log('user '+ id +' disconnected');
            io.emit('message', {type:'nodes', ids : connections});
            console.log(connections);
        }

    });

    socket.on('message', (message) => {
        if(connections.indexOf(message) == -1 && message){
            socket.peerId = message;
            connections.push(message);
            console.log('user '+ message +' connected');
            io.emit('message', {type:'nodes', ids : connections});
            console.log(connections);
        }
    });
});


http.listen(5000, () => {
    console.log('started on port 5000');
});
