import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '@/views/index.vue'

import org from '@/views/org.vue'
import cus from '@/views/cus.vue'

import organize from './organize' // .js可以省略
import customer from './customer' // .js可以省略





Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:()=> import('../views/login.vue'),
    name:'login'
  },
  {
    path:'/',
    name:'index',
    redirect:'/org',
    component: index,
    children:[
      {
        path:'org', 
        name:'org',
        component:org,
        children:organize
      },
      {
        path:'cus',
        name:'cus',
        component:cus,
        children:customer
      }

    ]
  }
]
// 利用懒加载的方式去引入路由，当访问这个路由的时候，这个路由对应的组件才会被加载
const router = new VueRouter({
  routes
})

export default router
