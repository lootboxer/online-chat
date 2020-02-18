<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary text-white">
      <q-toolbar class="justify-between">
        <div>
          <div v-if="userData.status=='support'">
            <q-toolbar-title>
            <q-btn dense flat round icon="menu" @click="left = !left" />
              {{`Вы разговариватее с ${dialogWith?dialogWith:"ботом"}`}}
            </q-toolbar-title>
          </div>
        </div>
        <q-chip 
        icon="person" 
        text-color="white"
        :color="userData.status=='support'?'deep-orange':'primary'">
          {{userData.status|roleFilter}}
        </q-chip>
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
  filters:{
    roleFilter:function(val){
      let res = (val=="support")?"Оператор":"Пользователь"
      return res
    }
  },
  components:{
    Chat
  }
}
</script>
