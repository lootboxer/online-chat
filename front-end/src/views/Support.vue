<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          {{dialogWith?`Вы разговариватее с ${dialogWith}`:'Bot'}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" elevated>
      <q-item 
      v-for="name of chatsList"
      :key='`support-${name}`'
      @click="pickUserHandler(name)"
      clickable 
      v-ripple>
      {{name}}
        <q-icon color="primary" name="call" />
      </q-item>
    </q-drawer>

    <Chat :selectedName="pickedName"/>
  </q-layout>

</template>

<script >
import Chat from "@/components/Chat"

export default {
  props:{
    supports:{
      type:Array,
      default:function(){
        return ['Yaa']
      }
    }
  },
  data(){
    return {
      left: true,
      pickedName:""
    }
  },
  computed:{
    chatsList(){
      return this.$store.getters.chatsList
    },
    dialogWith(){
      return this.$store.getters.dialogWith
    }
  },
  methods:{
    pickUserHandler(name){
      this.pickedName = name
    }
  },
  components:{
    Chat
  }
  
}
</script>
