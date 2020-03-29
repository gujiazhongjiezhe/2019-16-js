// fs  path:resolve(将相对路径转化为绝对路径) http url

let http = require('http');
let url = require('url'); // 处理路径的模块
let mime = require('mime'); // 

http.createServer(function(req,res){
    // req求情的信息  res响应的信息
    // req.url // 请求的路径
    let {pathname,query} = url.parse( req.url,true)


    // mime身上有一个方法getType(pathname)
    res.setHeader('content-type',mime.getType(pathname));



    console.log(999)
    res.setHeader('content-type','text/html')
    res.end('');
    // 静态资源文件  html css js
    // json数据

}).listen(8888,function(){ // 监听一个端口
    console.log('8888端口监听成功')
})