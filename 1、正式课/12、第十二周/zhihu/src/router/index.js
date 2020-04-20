import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/'
import nav from './nav.js'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      name:'index',
      component:index,
      redirect:'/home',
      children: nav
    }
]

const router = new VueRouter({
  routes
})

export default router
