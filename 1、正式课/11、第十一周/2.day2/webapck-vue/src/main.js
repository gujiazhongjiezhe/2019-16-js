import Vue from 'vue';

// 如果是自己写的模块，必须要使用相对路径，这里必须要加上 './',如果不加./那就找不到
import App from './App.vue';

new Vue({
    el:"#app",
    data(){
        return {
            a:100
        }
    },
    render(h){
            // h是一个函数，可以传入组件，也可以传入对象，他会把这个组件或者对象渲染成虚拟的dom
        // h()的返回结果就是虚拟的DOM对象
        // render函数会返回一个虚拟的dom节点，当new Vue进行编译时，他会把这个虚拟的dom节点转化为真实的dom元素，然挂载到对应的元素上
        return h(App)
    }
})