import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    status:'',
    name:'',
    chats:[],
    dialogWith:'',
    socket:null
  },
  mutations: {
    SET_STATUS(state,val){
      state.status = val;
    },
    SET_NAME(state,val){
      state.name = val;
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
    set_name({commit}, val){
      commit('SET_NAME',val)
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
    name: (state) => state.name,
    userData: ({status, name}) => {return {status, name}},
    chatsList: state => state.chats,
    dialogWith: state => state.dialogWith
  }
})
