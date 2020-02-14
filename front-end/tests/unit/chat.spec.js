import { shallowMount, createLocalVue } from '@vue/test-utils'
import Chat from '@/components/Chat.vue'
import Vue from "vue"
import Vuex from 'vuex'
import Quazar from '@/../node_modules/quasar'

Vue.use(Quazar)

const localVue = createLocalVue()

localVue.use(Vuex)


describe('Chat.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      clicks: () => 2,
      inputValue: () => 'input'
    }

    store = new Vuex.Store({
      getters
    })
  })

  it('Напечатать сообщение', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Chat, {
      propsData: { propsData:msg },
    })
    expect(wrapper.text()).toBe(msg)

  })
})
