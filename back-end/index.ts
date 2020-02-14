var app = require('express')();
var server = require('http').Server(app);
var io  = require('socket.io')(server);

let port: number = 80
server.listen(port,()=>console.log(port,`Listen on ${port}`));


let nspSupports = io.of('./supports');
let nspClients = io.of("/")

let clients:{[key: string]:any}={};
let supports:{[key: string]:any}={};

function newConnectio(name:string) {
  
}

function clientConnectHandler(socket:any, nickname:string) {
  //TODO: Проверка на наличие имени
  clients[nickname] = {socket}
  nspClients.send('message', `${nickname} Connected!`)
  socket.on('disconnect',()=>{
    delete clients[nickname]
  })
  console.log(`Connected client: ${nickname}`)
}

function supportConnectHandler(socket:any, nickname:string){
  socket.emit('get users', Object.keys(clients))
  socket.on('start dialog', (name:string)=>{
    supports[nickname].dialog=name
    socket.on('message', (msg:string)=>{
      if(clients[name]){
        clients[name].socket.send(`Привет ${nickname}, чем могу помочь?`,msg)
      } else {
        socket.send("error", "Такого пользователя в сети больше нет")
      }
    })
  })
  //TODO: Проверка на наличие
  supports[nickname]={socket}
  socket.on('disconnect',()=>{
    delete supports[nickname]
  })


  console.log(`Connected operator: ${nickname}`)
}

io.on('connection', function (socket: any) {
  let addedUser = false;
  //TODO: Type of userData
  socket.on('new Session', ({nickname, status}:any) => {
    if (addedUser) return;
    if (status=="support") {
      supportConnectHandler(socket,nickname)
    } else {
      clientConnectHandler(socket,nickname)
    };
    addedUser=true;
  });
});