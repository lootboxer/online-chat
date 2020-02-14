"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 80;
server.listen(port, function () { return console.log(port, "Listen on " + port); });
var nspSupports = io.of('/support');
var nspUsers = io.of("/"), j;
var clients = {};
//todo:interface of message
nspSupports.on('connect', function (socket) {
    socket.on('message', (function (obj) {
        nspUsers.send(obj);
    }));
});
nspUsers.on('connect', function (socket) {
    nspSupports.send({ text: "hello user, wait operator, pleaseee...", name: "Operator" });
});
