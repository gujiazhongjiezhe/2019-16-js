import Vue from 'vue'
import VueRouter from 'vue-router'





Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:()=> import('../views/login.vue'),
    name:'login'
  }
]
// 利用懒加载的方式去引入路由，当访问这个路由的时候，这个路由对应的组件才会被加载
const router = new VueRouter({
  routes
})

export default router
