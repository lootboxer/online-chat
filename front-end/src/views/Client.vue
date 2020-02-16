<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          {{dialogWith?`Вы разговариватее с ${dialogWith}`:'Bot'}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container >
      <Chat/>
    </q-page-container>
  </q-layout>

</template>

<script >
import Chat from "@/components/Chat"

export default {
  name:"Client",
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
      left: true
    }
  },
  computed:{
    dialogWith(){
      return this.$store.getters.dialogWith
    }
  },
  components:{
    Chat
  }
  
}
</script>
