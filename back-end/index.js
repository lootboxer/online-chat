"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 80;
server.listen(port, function () { return console.log(port, "Listen on " + port); });
var nspSupports = io.of('/support');
var nspUsers = io.of("/");
// !USERS
var clients = {};
nspUsers.on('connect', function (socket) {
    var nickname;
    socket.on('username', function (name) {
        nickname = name;
        clients[name] = socket;
    });
    socket.on('disconnect', function () {
        if (clients[nickname])
            delete clients[nickname];
    });
    socket.send("hello user, wait operator, pleaseee...");
    socket.on('message', function (msg) {
        nspSupports.send(msg);
    });
});
// !SUPPORTS
//todo:interface of acquaintance
nspSupports.on('connect', function (socket) {
    socket.emit('set UserList', Object.keys(clients));
    socket.on('acquaintance', function (obj) {
        var from = obj.from, to = obj.to;
        if (clients[to]) {
            clients[to].emit("acquaintance", from);
        }
    });
    socket.on('message', function (msg) {
        var text = msg.text, to = msg.to;
        if (clients[to])
            clients[to].send(text);
    });
});
