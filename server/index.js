"use strict";
exports.__esModule = true;
var socketio = require("socket.io");
var app = require('express')();
var server = require('http').Server(app);
var io = socketio(server);
var port = 8091;
server.listen(port, function () { return console.log(port, "Listen on " + port); });
var nspSupports = io.of('/support');
var nspUsers = io.of("/");
// !USERS
var clients = {};
nspUsers.on('connect', function (socket) {
    var clientNickname;
    socket.on('username', function (name) {
        clientNickname = name;
        clients[name] = socket;
        nspSupports.emit("set UsersList", Object.keys(clients));
    });
    socket.on('disconnect', function () {
        if (clients[clientNickname])
            delete clients[clientNickname];
        nspSupports.emit("set UsersList", Object.keys(clients));
    });
    socket.send("Hello user, wait operator, pleaseee...");
    socket.on('message', function (msg) {
        if (clients[clientNickname].dialogWith) {
            clients[clientNickname].dialogWith.send(msg);
        }
        else {
            nspSupports.send("Please, help me! I here alone! My name is: \"" + clientNickname + "\"");
        }
    });
});
// !SUPPORTS
//todo:interface of acquaintance
nspSupports.on('connect', function (socket) {
    socket.emit('set UserList', Object.keys(clients));
    socket.on('acquaintance', function (obj) {
        var from = obj.from, to = obj.to;
        if (clients[to]) {
            clients[to].dialogWith = socket;
            clients[to].emit("acquaintance", from);
        }
    });
    socket.on("disconnect", function (socket) {
        var withoutOperator = Object.keys(clients).find(function (val) {
            return clients[val].socket == socket;
        });
        if (withoutOperator)
            clients[withoutOperator].socket.emit("acquaintance", "ботом");
    });
    socket.on('message', function (msg) {
        var text = msg.text, to = msg.to;
        if (clients[to])
            clients[to].send(text);
    });
});
