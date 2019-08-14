import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App.vue'
import Landing from "@/Landing.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'app',
      component: App
    }, {
      path: '/landing',
      name: 'landing',
      component: Landing
    },
  ]
})
