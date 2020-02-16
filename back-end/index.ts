import { Socket } from "dgram";

var app = require('express')();
var server = require('http').Server(app);
var io  = require('socket.io')(server);

let port: number = 80
server.listen(port,()=>console.log(port,`Listen on ${port}`));


let nspSupports = io.of('/support');
let nspUsers = io.of("/")


// !USERS

let clients:{[key: string]:any}={};

nspUsers.on('connect', (socket:any)=>{
  let nickname:string
  socket.on('username', (name:string)=>{
    nickname = name
    clients[name] = socket
  });
  socket.on('disconnect',()=>{
    if (clients[nickname]) delete clients[nickname]
  });
  socket.send({text:"hello user, wait operator, pleaseee...",name:"Bot"})
})

// !SUPPORTS

//todo:interface of message
nspSupports.on('connect', (socket:any) => {
  let nickname:string
  socket.emit('set UserList',Object.keys(clients))
  socket.on('username',(name:string)=>{
    nickname=name
  })
  socket.on('message',(msg:any)=>{
    let {text,to} = msg
    clients[to].send({text,name:nickname})
  })
})