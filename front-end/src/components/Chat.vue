<template>
  <div id="app" class="q-pa-md column justify-between">
    <div id="chatField" >
      <q-chat-message
      v-for="(val, index) in messages"
      :key="`message-${index}`"
      :name="val.name"
      :sent="val.sent"
      :text="val.text"
      >
      </q-chat-message>

    </div>
    <q-footer position="bottom" >
      <q-toolbar class="bg-grey-3 text-black row">
        <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
        <q-input rounded outlined dense 
        class="WAL__field col-grow q-mr-sm" 
        bg-color="white" 
        v-model="tempMessage"
        @keyup.enter="clickButton"
        placeholder="Напишите сообщение" />
        <q-btn ref="sendButton" @click="sendMessage" round two-tone icon="send" />
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>
import {socketConnect} from "@/lib/connect.ts"

export default {
  name:"Chat",
  data(){
    return{
      tempMessage:"",
      messages:[],
      userData:{},
      chatSocket:null
    }
  },
  computed:{
    lastMessage(){
      let lastIndex = this.messages?this.messages.length-1:0;
      return lastIndex?this.messages[lastIndex]:null
    },
    dialogWith(){
      return this.$store.getters.dialogWith
    }
  },
  methods:{
    drawMessage(byMe, msg){
      // If lastMessage was been send same user as before, then I push in array of this
      if(this.lastMessage){
        if (this.lastMessage.sent==byMe) {
          this.lastMessage.text.push(this.tempMessage)
          return true;
        }
      } 
      let text = byMe?[this.tempMessage]:[msg];
      let name = byMe?this.userData.nickname:this.dialogWith
      this.messages.push({sent:byMe,text,name})
      return true
    },
    sendMessage() {
      if (this.userData.status == 'support'){
        this.chatSocket.send({text:this.tempMessage,to:this.dialogWith})
      } else {
        this.chatSocket.send(this.tempMessage)
      }
      this.drawMessage(true)
      this.tempMessage=''
    },
    clickButton(){
      this.$refs.sendButton.click()
    }
  },
  mounted(){
    this.userData=this.$store.getters.userData;
    this.chatSocket = socketConnect(this.userData)
    this.chatSocket.on('set dialogWith',(name)=>{
      this.$store.dispatch('set_dialog',name)
    })
    this.chatSocket.on('message',({text,name})=>{
      this.drawMessage(false, text)
    })
  }
}
</script>

<style>

</style>