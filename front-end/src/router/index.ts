import { RouteConfig } from 'vue-router'
import store from "src/store"

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('src/views/Login.vue')
  },
  {
    path: '/',
    name: 'Client',
    component: () => import('layouts/MainLayout.vue')
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('layouts/MainLayout.vue')
  }
]

const router = new VueRouter({
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if (store.getters.status in ['client','support'] ) {
    next()
  } else if (to.path!='/login') {
    next('/login');
  } 
  next()
})

export default router
