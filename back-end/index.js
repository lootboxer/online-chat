"use strict";
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 80;
server.listen(port, function () { return console.log(port, "Listen on " + port); });
var nspSupports = io.of('./supports');
var nspClients = io.of("/");
var clients = {};
var supports = {};
function newConnectio(name) {
}
function clientConnectHandler(socket, nickname) {
    //TODO: Проверка на наличие имени
    clients[nickname] = { socket: socket };
    nspClients.send('message', nickname + " Connected!");
    socket.on('disconnect', function () {
        delete clients[nickname];
    });
    console.log("Connected client: " + nickname);
}
function supportConnectHandler(socket, nickname) {
    socket.emit('get users', Object.keys(clients));
    socket.on('start dialog', function (name) {
        supports[nickname].dialog = name;
        socket.on('message', function (msg) {
            if (clients[name]) {
                clients[name].socket.send("\u041F\u0440\u0438\u0432\u0435\u0442 " + nickname + ", \u0447\u0435\u043C \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C?", msg);
            }
            else {
                socket.send("error", "Такого пользователя в сети больше нет");
            }
        });
    });
    //TODO: Проверка на наличие
    supports[nickname] = { socket: socket };
    socket.on('disconnect', function () {
        delete supports[nickname];
    });
    console.log("Connected operator: " + nickname);
}
io.on('connection', function (socket) {
    var addedUser = false;
    //TODO: Type of userData
    socket.on('new Session', function (_a) {
        var nickname = _a.nickname, status = _a.status;
        if (addedUser)
            return;
        if (status == "support") {
            supportConnectHandler(socket, nickname);
        }
        else {
            clientConnectHandler(socket, nickname);
        }
        ;
        addedUser = true;
    });
});
