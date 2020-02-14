<template>
  <div id="app" class="q-pa-md column justify-between">
    <div id="chatField" >
      <q-chat-message
      v-for="(val, index) in messages"
      :key="`message-${index}`"
      :name="userData.nickname"
      :sent="val.sent"
      :text="val.text"
      >
      </q-chat-message>

    </div>
    <q-footer>
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
import store from "@/store"
import {socketConnect} from "@/lib/connect.ts"

export default {
  name:"Chat",
  props:{
    pickedName:{
      type: String,
      // name of client from clientsList
      default: ""
    }
  },
  data(){
    return{
      tempMessage:"",
      messages:[],
      userData:{},
      mySocket:{}
    }
  },
  watch:{
    pickedName:(val)=>{
      if(this.mySocket)
        this.mySocket.emit('start dialog', val)
    }
  },
  computed:{
    lastMessage(){
      let lastIndex = this.messages?this.messages.length-1:0;
      return this.messages[lastIndex]
    }
  },
  methods:{
    sendMessage() {
      if(this.lastMessage){
        if (this.lastMessage.sent) {
          this.lastMessage.text.push(this.tempMessage)
        } else {
          this.messages.push({text:[this.tempMessage], sent:true})
          }
      } else {
        this.messages.push({text:[this.tempMessage], sent:true})
      }
      this.tempMessage=''
    },
    clickButton(){
      this.$refs.sendButton.click()
    }
  },
  mounted(){
    this.userData=store.getters.userData
    this.mySocket = socketConnect(this.userData);
    this.mySocket.on('message', (msg)=>{
      if (this.lastMessage){
        if (!this.lastMessage.sent) {
          this.lastMessage.text.push(msg)
        } else {
          this.messages.push({text:[msg], sent:false})
        }
      } else {
        this.messages.push({text:[msg], sent:false})
      }
    })
    this.mySocket.on('disconnect',()=>{
      this.mySocket = null
      alert("DISCONNECTED, please reload page!")
    })

  }
}
</script>

<style>

</style>