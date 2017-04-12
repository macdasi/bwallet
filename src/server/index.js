/**
 * Created by hadar.m on 05/04/2017.
 */

var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next) {
    console.log("get /")
    res.send('Hello world!');
});

var server = app.listen(9000);
var options = {
    debug: true,
    allow_discovery: true
}

peerServer = ExpressPeerServer(server, options)
app.use('/bwallet', peerServer);

peerServer.on('connection', function(id) {
    console.log(id)
    console.log(server._clients)
});

server.on('disconnect', function(id) {
    console.log(id + " disconnect")
});

