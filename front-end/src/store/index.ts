import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    status:'',
    nickname:'',
    chats:[],
    dialogWith:'',
    socket:null
  },
  mutations: {
    SET_STATUS(state,val){
      state.status = val;
    },
    SET_NICKNAME(state,val){
      state.nickname = val;
    },
    SET_CHATS(state, val){
      state.chats = val
    },
    SET_DIALOG(state,name){
      state.dialogWith = name
    }
  },
  actions: {
    set_status({commit}, val){
      commit('SET_STATUS',val)
    },
    set_nickname({commit}, val){
      commit('SET_NICKNAME',val)
    },
    set_chats({commit}, val){
      commit("SET_CHATS", val)
    },
    set_dialog({commit},name){
      commit("SET_DIALOG",name)
    }
  },
  getters: {
    status: (state) => state.status,
    nickname: (state):string => state.nickname,
    userData: ({status,nickname}) => {return {status,nickname}},
    chatsList: state => state.chats,
    dialogWith: state => state.dialogWith
  }
})
