import { Socket } from "dgram";

var app = require('express')();
var server = require('http').Server(app);
var io  = require('socket.io')(server);

let port: number = 80
server.listen(port,()=>console.log(port,`Listen on ${port}`));


let nspSupports = io.of('/support');
let nspUsers = io.of("/")j

let clients:{[key: string]:any}={};
//todo:interface of message
nspSupports.on('connect',(socket)=>{
  socket.on('message',((obj)=>{
    nspUsers.send(obj)
  })
})

nspUsers.on('connect', (socket)=>{
  nspSupports.send({text:"hello user, wait operator, pleaseee...",name:"Operator"})
})
