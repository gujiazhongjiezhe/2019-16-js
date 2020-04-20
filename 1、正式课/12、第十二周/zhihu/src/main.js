import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/less/common.less' // 引入的公共的样式


// vant是专门用来开发vue项目移动的端的，和element-ui类似
// 在项目运行之前，会把vant里所有的组件全部加载
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant)

// 按需加载，为了性能优化
import 'vant/lib/index.css';
import {Button,Icon,Search,Tab, Tabs} from 'vant';
Vue.use(Button).use(Icon).use(Search).use(Tab).use(Tabs)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
