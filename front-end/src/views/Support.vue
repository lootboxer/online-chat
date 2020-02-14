<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          Пользователи
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" elevated>
      <q-item 
      v-for="name of usersList"
      :key='`support-${name}`'
      @click="pickUserHandler(name)"
      clickable 
      v-ripple>
      {{name}}
        <q-icon color="primary" name="call" />
      </q-item>
    </q-drawer>

    <q-page-container height='100%'>
      <Chat/>
    </q-page-container>
  </q-layout>

</template>

<script >
import Chat from "@/components/Chat"

import store from "@/store"

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
      pickedName:"",
    }
  },
  watch:{
    pickedName(newVal){
      store.$dispatch('set_dialog',newVal)
    }
  },
  computed:{
    usersList(){
      return store.getters.usersList
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
