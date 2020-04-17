import http from './http'; 

// 安全退出接口
export function signout(option={}){
    return http.get('/user/signout',option).then(data=>{
        return data
    })
}

// 验证用户是否登录接口
export function judeLogin(option={}){
    return http.get('/user/login',option).then(data=>{
        return data
    })
}