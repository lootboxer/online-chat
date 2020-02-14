import io from 'socket.io-client';
import store from '@/store'

interface userData {
  nickname:string;
  status:string;
};

export function socketConnect( user: userData) {

  let path = user.status == 'support'?'/support':'/'
    const socket = io(`http://localhost${path}`)
    socket.on('connect', function() {
      console.log('connected')
    })
    socket.on('disconnect', function(){
      console.log("disconnected")
    })
    socket.on("set UserList", (userList)=>{
      store.dispatch("set_chats",userList)
    })
    return socket
}
