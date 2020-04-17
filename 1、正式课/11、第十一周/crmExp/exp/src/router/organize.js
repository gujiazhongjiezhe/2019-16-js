import department from '@/components/department'
import addDepartment from '@/components/department/adddepartment.vue'

import user from '@/components/user/index.vue'
import addUser from '@/components/user/adduser.vue'

import job from '@/components/job/index.vue';
import addJob from '@/components/job/addjob.vue'



export default [
    {
        path: 'department',
        name: 'department',
        component: department,
        meta:{
            type:'department',
            rootTil:'部门管理',
            til:'部门列表',
            icon:'el-icon-s-promotion',
            power: 'departhandle',
            my_Router:'/org/department'
        }
    },
    {
        path: 'addDepartment',
        name: 'addDepartment',
        component: addDepartment,
        meta:{
            type:'department',
            rootTil:'部门管理',
            til:'新增部门',
            icon:'el-icon-s-promotion',
            power: 'departhandle',
            my_Router:'/org/addDepartment'
        }
    },
    {
        path: 'user',
        name: 'user',
        component: user,
        meta:{
            type:'user',
            rootTil:'用户管理',
            til:'用户列表',
            icon:'el-icon-s-flag',
            power: 'userhandle',
            my_Router:'/org/user'
        }
    },
    {
        path: 'addUser',
        name: 'addUser',
        component: addUser,
         meta:{
            type:'user',
            rootTil:'用户管理',
            til:'新增用户',
            icon:'el-icon-s-flag',
            power: 'userhandle',
            my_Router:'/org/addUser'
        }
    },
    {
        path: 'job',
        name: 'job',
        component: job,
        meta:{
            type:'job',
            rootTil:'职务管理',
            til:'职务列表',
            icon:'el-icon-s-check',
            power: 'jobhandle',
            my_Router:'/org/job'
        }
    },
    {
        path: 'addJob',
        name: 'addJob',
        component: addJob,
        meta:{
            type:'job',
            rootTil:'职务管理',
            til:'新增职务',
            icon:'el-icon-s-check',
            power: 'jobhandle',
            my_Router:'/org/addJob'
        }
    }
]