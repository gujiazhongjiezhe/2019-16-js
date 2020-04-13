class VueRouter {
    constructor(options) {
        // this.xxx // 给当前实例增加私有属性
        // this-->是vueRouter的实例
        const { routes } = options;
        // [{path:'/home',component:home},{path:'/list',component:list}]
        // 循环遍历routes，把所有的path和component放到一个新对象中
        // 这是我们想要的结果 {'/home':home,'/list':list}
        this.routeMap = routes.reduce((prev, next) => {
            // 第一次 {}     数组的第一项
            // 第二次 {'/home':home}    数组的第二项
            prev[next.path] = next.component;
            return prev;
        }, {});

        // 会让视图更新，具有响应式,在vueRouter实例上新增一个对象，对象里有一个属性path，默认值是 '/'
        Vue.util.defineReactive(this.route = {},'path','/');
        // console.log(this.routeMap[this.route.path])
        window.addEventListener('load', () => {
            // 当页面首次初始化完成就执行
            // 为了保证页面的完整性，如果当前页面没有hash值，那就给他赋一个默认的hash值
            window.location.hash ? null : window.location.hash = '/';
        })
        window.addEventListener('hashchange', () => {
            // 只要页面的hash值发生变化，他就会执行
            // 获取页面上的hash值,把#去掉  '#/home'
            let path = window.location.hash.slice(1);
            // 页面的hash值一旦发生变化，就把最新的hash值赋值给route的path
            this.route.path = path;

        })
    }
    // fn(){}
}

// 在vuex里注入的是$store ,在路由中注入的是_router
VueRouter.install = function (_Vue) {
    _Vue.mixin({
        beforeCreated() {
            // 给每一个vue实例新增_router属性，其属性值就是当前VueRouter的实例
            // this是vue的实例
            if (this.$options && this.$options.router) {
                // 给vue的根实例增加私有属性_router属性，其属性值就是当前VueRouter的实例
                this._router = this.$options.router
            }
            else {
                // 给vue的组件实例增加私有属性_router属性，其属性值就是当前VueRouter的实例
                this._router = this.$parent && this.$parent._router
            }

            // 给每一个实例注入$route属性
            Object.defineProperty(this,'$route',{
                value:{
                    route:this._router.route
                }
            })


            // 注册两个内置组件
            // child 组件
            // router-link  router-view
            // <router-link to="/home">按钮1</router-link>
            _Vue.component('router-link', {
                // template:'<a></a>'
                props: ['to'], // 会把props里的属性挂载的当前组件的实例上
                render() {
                    // 这里的语法是jsx的语法
                    return <a href={`#${this.to}`}>this.$slots.default</a>
                }
            });
            _Vue.component('router-view', {
                render(createElement) { // createElement就是一个渲染函数
                    // 需要动态传递一个组件的名字
                    return createElement(this._router.routeMap[this._router.route.path])
                }
            })



        }
    })
}

// let router = new VueRouter({
//     routes:[{path:'/home',component:home},{path:'/list',component:list}]
// })
// let vm = new Vue({
//     el:"#app",
//     data:{

//     },
//     router //  在Vue根实例上的$options里就有了
// })
export default VueRouter