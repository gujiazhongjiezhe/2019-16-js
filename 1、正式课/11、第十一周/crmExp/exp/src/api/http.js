// 在真正的工作中，需要对axios进行二次封装
import axios from 'axios';
import qs from 'qs'; // 这个插件是你下载axios的时候自动下载的
const http = axios.create({
    // baseUrl:''
    transformRequest(data={}) {
        console.log(data, 'http->6')
        // {account:'123',password:'666'}
        // 只针对于post请求有效
        // data就是你想服务器发送的请求参数，这个函数必须返回一个字符串
        // data.time = Math.random();

        // let str = ``;
        // for(var key in data){
        //     str+=`${key}=${data[key]}&`
        // }
        // return str
        
        data = qs.stringify(data);
        // account=111&password=222
        return data
        // console.log(qs, 'http->18')


    },
    //  params: {
    //     ID: 12345
    // },
    timeout: 2000,
    
});
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response,355)
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


// http.post('index/item').then((data)=>{
//     console.log(data)
// })
// http.post('index/list')

export default http;
