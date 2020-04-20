import home from '@/components/home'
import vip from '@/components/vip'
import notify from '@/components/notify'
import user from '@/components/user'
export default [
    {
        path:'home',
        name:'home',
        component:home,
        children:[
            {
                path:'focus',
                name:'focus',
                component:()=> import('@/components/home/focus.vue')
            },
            {
                path:'recommend',
                name:'recommend',
                component:()=> import('@/components/home/recommend.vue')
            },
            {
                path:'hot',
                name:'hot',
                component:()=> import('@/components/home/hot')
            }
        ]
    },
    {
        path:'vip',
        name:'vip',
        component:vip
    },
    {
        path:'notify',
        name:'notify',
        component:notify
    },
    {
        path:'user',
        name:'user',
        component:user
    }
]