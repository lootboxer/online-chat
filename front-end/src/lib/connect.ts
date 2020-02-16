import io from 'socket.io-client';
import store from '@/store'

interface userData {
  name:string;
  status:string;
};

export function socketConnect( user: userData) {

  let path = user.status == 'support'?'/support':'/'
  const socket = io(`http://localhost${path}`)
  socket.emit("username", user.name)
  socket.on('connect', function() {
    console.log("connected")
  })
  socket.on("disconnect", function(){
    console.log("disconnected")
  })
  if(user.status == 'support'){
    socket.on("set UserList", (usersList:string[])=>{
      store.dispatch("set_chats",usersList)
    })
  } else {
    socket.on("acquaintance", (name:string)=>{
      store.dispatch("set_dialog", name)
    })
  }
  return socket
}
