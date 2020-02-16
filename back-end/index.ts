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
  let clientNickname:string
  socket.on('username', (name:string)=>{
    clientNickname = name
    clients[name] = socket
  });
  socket.on('disconnect',()=>{
    if (clients[clientNickname]) delete clients[clientNickname]
  });
  socket.send("Hello user, wait operator, pleaseee...")
  socket.on('message',(msg:string) => {
    if (clients[clientNickname].dialogWith){
      clients[clientNickname].dialogWith.send(msg)
    } else {
      nspSupports.send(`Please, help me! I here alone! My name is: "${clientNickname}"`)
    }
  })
})

// !SUPPORTS

//todo:interface of acquaintance
nspSupports.on('connect', (socket:any) => {
  socket.emit('set UserList',Object.keys(clients))
  socket.on('acquaintance',(obj:any)=>{
    let {from,to} = obj
    if(clients[to]){
      clients[to].dialogWith=socket
      clients[to].emit("acquaintance", from)
    }
  })
  socket.on('message',(msg:any)=>{
    let {text,to} = msg
    if(clients[to]) clients[to].send(text)
  })
})