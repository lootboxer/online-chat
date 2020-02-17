<template>
  <div >
    <q-form
      class="column items-center"
      ref='form'
    >
      <q-input
        filled
        v-model="nickname"
        label="Ваше имя"
        hint="Введите ваше имя"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Введите что-нибудь']"
      />
      <div id="buttons" class="q-gutter-x-md q-pa-md">
        <q-btn label="Пользователь" type="client" color="purple" @click="toClient"/>
        <q-btn label="Оператор" type="support" color="secondary" @click="toSupport" flat />
      </div>
    </q-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data:()=>{
    return {
      nickname: ''
    }
  },
  methods:{
    toClient(){
      this.$refs['form'].validate()
      .then((val)=>{
        if (val) this.toRedirect('')
      })
    },
    toSupport(){
      this.$refs['form'].validate()
      .then((val)=>{
        if (val) this.toRedirect('support')
      })
    },
    toRedirect(status) {
      this.$store.dispatch('set_status',status)
      this.$store.dispatch('set_name',this.nickname)
      if(this.$store.getters.status == 'support') {
        this.$router.push(`/support`)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>