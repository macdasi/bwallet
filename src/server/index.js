/**
 * Created by hadar.m on 05/04/2017.
 */

var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next) {
    console.log("get /");
    res.send(connected);
});

var server = app.listen(9000);
var options = {
    debug: true,
    allow_discovery: true
};

var connected = [];


peerServer = ExpressPeerServer(server, options)
app.use('/bwallet', peerServer);

peerServer.on('connection', function(id) {
    var idx = connected.indexOf(id); // only add id if it's not in the list yet
    if (idx === -1) {connected.push(id);}
    //peerServer.emit('connection', { data : 'haddar'});
    debugger;
    console.log(peerServer._wss.clients);
    console.log(connected);
});
peerServer.on('disconnect', function (id) {
    var idx = connected.indexOf(id); // only attempt to remove id if it's in the list
    if (idx !== -1) {connected.splice(idx, 1);}
    console.log(connected);
});
server.on('disconnect', function(id) {
    console.log(id + " disconnect")
});

