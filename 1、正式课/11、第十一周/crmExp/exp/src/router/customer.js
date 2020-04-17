import myCustomer from '@/components/customer/mycustomer.vue'
import allCustomer from '@/components/customer/allcustomer.vue'
import addCustomer from '@/components/customer/addcustomer.vue'

export default [
    {
        path: 'myCustomer',
        name: 'myCustomer',
        component:myCustomer,
        meta:{
            type:'cus',
            rootTil:'客户管理',
            til:'我的客户',
            icon:'el-icon-s-check',
            power: 'userhandle',
            my_Router:'/cus/myCustomer'
        }
    },
    {
        path: 'addCustomer',
        name: 'addCustomer',
        component: addCustomer,
        meta:{
            type:'cus',
            rootTil:'客户管理',
            til:'新增客户',
            icon:'el-icon-s-check',
            power: 'userhandle',
            my_Router:'/cus/addCustomer'
        }
    },
    {
        path: 'allCustomer',
        name: 'allCustomer',
        component: allCustomer,
        meta:{
            type:'cus', // 导航的类型
            rootTil:'客户管理', // 一集标题
            til:'全部客户', // 二级标题
            icon:'el-icon-s-check', // 一集标题的小图标
            power: 'allcustomer', // 控制的权限
            my_Router:'/cus/allCustomer' // 跳转的路径
        }
    },
    

]