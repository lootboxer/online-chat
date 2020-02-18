import * as io from "socket.io-client";
import store from 'src/store'

interface userData {
  name:string;
  status:string;
};

export function socketConnect( user: userData) {

  let path = user.status == 'support'?'/support':'/'
  const socket = io(`http://localhost:8091${path}`)
  socket.emit("username", user.name)
  socket.on("disconnect", function(){
    console.log("disconnected")
  })
  if(user.status == 'support'){
    socket.on("set UsersList", (usersList:string[])=>{
      store.dispatch("set_chats",usersList)
    })
  }
  socket.on("acquaintance", (name:string)=>{
    store.dispatch("set_dialog", name)
  })
  return socket
}
