<template>
  <div id="app" class="q-pa-md column justify-between">
    <q-page-container>
      <q-page ref="chatPage" class="flex column">
        <div class="q-pa-md column col">
            <q-chat-message
            v-for="(val, index) in messages"
            :key="`message-${index}`"
            :name="val.name"
            :sent="val.sent"
            :text="val.text"
            >
            </q-chat-message>
        </div>
      </q-page>
    </q-page-container>

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
import {socketConnect} from "src/lib/connect.ts"

export default {
  name:"Chat",
  props:{
    selectedName:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      tempMessage:"",
      messages:[],
      userData:{},
    }
  },
  computed:{
    lastMessage(){
      let lastIndex = this.messages?this.messages.length-1:0;
      return lastIndex?this.messages[lastIndex]:null
    },
    dialogWith(){
      let name = this.$store.getters.dialogWith;
      return name?name:"Bot"
    }
  },
  watch:{
    selectedName(newVal){
      this.chatSocket.emit("acquaintance", {
        to:newVal,
        from:this.userData.name
      })
      this.$store.dispatch('set_dialog',newVal)
    }
  },
  methods:{
    drawMessage(byMe, msg){
      // If lastMessage was been send same user as before, then I push in array of this
      let text = byMe?[this.tempMessage]:[msg];
      if(this.lastMessage){
        if (this.lastMessage.sent==byMe) {
          this.lastMessage.text.push(text)
          return true;
        }
      } 
      let name = byMe?this.userData.name:this.dialogWith
      this.messages.push({sent:byMe,text,name})
      return true
    },
    scrollToBottom(){
      let chatPage = this.$refs.chatPage.$el
      window.scrollTo(0,chatPage.scrollHeight)
    },
    sendMessage() {
      if (this.userData.status == 'support'){
        this.chatSocket.send({text:this.tempMessage,to:this.dialogWith})
      } else {
        this.chatSocket.send(this.tempMessage)
      }
      this.drawMessage(true)
      this.tempMessage=''
      this.scrollToBottom()
    },
    clickButton(){
      this.$refs.sendButton.click()
    }
  },
  mounted(){
    this.userData=this.$store.getters.userData;
    this.chatSocket = socketConnect(this.userData)
    this.chatSocket.on('message',(text)=>{
      this.drawMessage(false, text)
    })
    this.chatSocket.on('connect',socket=>{
      this.$q.notify({
        color:'teal',
        position:"top",
        message:`Вы были зарегистрированы под именем: "${this.userData.name}"`,
        icon:"thumb_up"
      })
    })
    this.chatSocket.on('disconnect',socket=>{
      this.$q.notify({
        color:'warning',
        position:"right",
        message:"Вы были отключены",
        icon:"thumb_down"
      })
    })
    this.chatSocket.on("acquaintance", (name)=>{
      this.$q.notify({
        color:'info',
        position:"right",
        message:`Вы теперь общаетесь с ${name}`,
        icon:"info"
      })
      store.dispatch("set_dialog", name)
    })
  }
}
</script>

<style>

</style>