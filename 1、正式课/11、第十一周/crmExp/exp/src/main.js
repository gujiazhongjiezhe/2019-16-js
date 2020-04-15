import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ele from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ele);
// 如果引入的是一个文件夹，那就会默认去找这个文件夹里的index.js文件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// main.js是webpack打包的入口文件，在这里可以配置一些全局的组件、filter过滤器、或者全局指令，全局的路由钩子函数

// element-ui是一个第三方的插件
// element-ui：基于vue二次封装的插件

// admin是后台的代码， 起订的端口号是3000
