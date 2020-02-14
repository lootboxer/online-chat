<template>
  <q-layout view="lHh Lpr lff">
    <q-page-container fit>
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
  components:{
    Chat
  }
  
}
</script>
