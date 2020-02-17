<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <div v-if="userData.status=='support'">
          <q-btn dense flat round icon="menu" @click="left = !left" />
          <q-toolbar-title>
            {{dialogWith?`Вы разговариватее с ${dialogWith}`:'Bot'}}
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer 
    v-if="userData.status=='support'"
    show-if-above v-model="left" side="left" elevated>
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
import Chat from "src/components/Chat"
import Vue from "vue"

export default {
  name:"MainLayout",
  data() {
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
    },
    userData(){
      return this.$store.getters.userData
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
