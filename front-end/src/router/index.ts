import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    name: 'Client',
    component: () => import('@/views/Client.vue')
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('@/views/Support.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if (['client','support'].includes(store.getters.status)) {
    next()
  } else if (to.path!='/login') {
    next('/login');
  } 
  next()
})

export default router
