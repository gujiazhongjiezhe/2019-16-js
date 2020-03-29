// express：他是一个机遇node封装的一个框架，而且是一个第三方的模块

// npm i express --save
let express = require('express');

let app = express(); // express是一个函数

// app.get('/index/:a',function(req,res){   // index/123456
app.get('/index',function(req,res){
    console.log(111)
    // req也是一个对象，他的身上有好多参数
    // console.log(req.params) // 路径动态的参数  // {a:123456}
    // console.log(req.query) // 获取请求的参数
    // console.log(req.method) // 请求方法
    // console.log(req.url) // 请求的路径
    res.send({name:1})  // 字符串  Buffer  '[object Object]'
    // 将服务器的数据传递给客户端

})
app.get('/login',function(req,res){
    console.log(222)
})
app.listen(8080,function(){
    console.log('8080端口已经启动成功')
})