class VueRouter {
    constructor(params) {
        const { routes } = params;
        // [{path:'/home',component:home},{path:'/list',component:list}]
        // {'/home':home,'/list':list}
        // this-->当前VueRouter的实例
        this.routeMap = routes.reduce((prev, next) => {
            prev[next.path] = next.component;
            return prev
        }, {});

        Vue.util.defineReactive(this.route = {},'path','/')
        window.addEventListener('load', () => {

            window.location.hash ? null : window.location.hash = '/';
        })
        window.addEventListener('hashchange', () => {
            let path = window.location.hash.slice(1);  // '#/home'
            this.route.path = path;
        })



    }
}

VueRouter.install = function (_Vue) {
    _Vue.mixin({
        beforeCreate() {
            // this-->当前的vue的实例
            // 给每一个vue实例增加一个私有属性_router,其属性值就是当前的VueRouter的实例
            if (this.$options && this.$options.router) {
                this._router = this.$potions.router;
            }
            else {
                this._router = this.$parent && this.$parent.$options.router
            }

            // 给每一个vue实例新增一个$route属性
            // this.$route = this._router.route;
            Object.defineProperty(this,'$route',{
                value:{
                    route: this._router.route
                }
            })

            // 注册两个内置组件
            // <router-link to="/home">按钮1</router-link>
            // <router-view></router-view>
            _Vue.component('router-link', {
                // template:'<a></a>'
                props: ['to'],
                render(h) { // 他是一个创建虚拟dom的一个函数
                    return <a href={`#${this.to}`}>this.$slots.default</a>
                }
            });
            _Vue.component('router-view', {
                render(h) {
                    return h(this._router.routeMap[this._router.route.path])
                }
            })
        }
    })
}

let router = new VueRouter({
    routes: [{ path: '/home', component: home }, { path: '/list', component: list }]
});
let vm = new Vue({
    el: '#app',
    data() {
        return {

        }
    },
    router
})

export default VueRouter


