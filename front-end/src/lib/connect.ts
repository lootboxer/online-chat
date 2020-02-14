import io from 'socket.io-client';
import store from '@/store'

interface userData {
  nickname:string;
  status:string;
};

export function socketConnect( user: userData) {

    const socket = io("http://localhost/")

    socket.on('connect', function() {
      //TODO: interface of user by TS 
      socket.emit("new Session", user)
      if( user.status == 'support'){
        socket.on("get users", (chats:string[])=>{
          store.dispatch("set_chats", chats)
        })
      } else {
        socket.on("START_SESSION",function(){
          console.log("Operator connected")
        })
      }
    })
    return socket
}
