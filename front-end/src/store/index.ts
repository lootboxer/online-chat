import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    status:'',
    nickname:'',
    chats:[]
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
    }
  },
  modules: {
  },
  getters: {
    status: (state) => state.status,
    nickname: (state):string => state.nickname,
    userData: ({status,nickname}) => {return {status,nickname}},
    chatList: state => state.chats
  }
})
