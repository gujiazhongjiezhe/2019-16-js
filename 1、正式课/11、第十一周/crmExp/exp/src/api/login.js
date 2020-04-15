import http from './http'; // 如果文件的后缀是.js可以把.js省略
// 如果引入的是一个文件夹，他会默认把文件夹里的index.js引入
export function login(option){
    return http.post('/user/login',option).then(data=>{
        return data
    })
}
// login函数的返回值是啥；是promise的实例
// then(()=>{
//     return 1
// }).then((ss)=>{
//     console.log(ss)
// })
// login({a:1,b:2}).then((data)=>{

// })

// export {
//     login:function(){}
// }