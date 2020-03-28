// fs  path:resolve(把相对路径转化为绝对路径)  http  url

// http 模块  url模块

// 服务器是一种直处在，监听的状态的状态，监听前段发过来的请求，把前段发过来的请求进行响应的数据处理，在把数据返回给客户端

// 服务器的代码要起一个服务，让服务器实时的处在监听的状态，如果你把服务器关了，就不会再对前段的请求作出任何响应

let http = require('http');
let url = require('url'); // 专门用来处理路径的模块

// 创建一个监听的服务
let server = http.createServer(function(req,res){
    console.log(111) // 这个函数他会等到客户端访问8080端口的时候才会执行，访问一次他就执行一次
    // req：请求信息   res：响应信息

    console.log(req.url) // 端口号后面的路径
    // url:parse:处理url的

    console.log(url.parse(req.url,true)) /// 他可以穿两个参数，第一个当前请求的路径，布尔值，(他可以吧参数变成对象格式的)
    // url.parse的返回值是一个大对象，pathname路径  query参数


        // res.end('1234') // 通过res.end方法，把参数的内容，传递给客户端

        // res可以设置响应头content-type的类型，当客户端发送请求的时候，后台接受到请求之后，先把响应头给了客户端，在响应头里面，设置了一个content-type，提前告诉浏览器你要按照什么格式进行接收响应的内容
        res.setHeader('content-type','text/html; charset=utf-8');
        res.end('中国'); // 如果不配置响应头，中文就会出现乱码
})



// 将该服务器部署到一个对应的端口上，一台服务器可以启动65535个端口，一个端口只能启动一个服务
server.listen(8080,function(){
    // 当前服务器监听8080端口，当监听成功之后，或默认调用这个函数，而且只会执行一次
    console.log('8080端口已经成功启动')
})