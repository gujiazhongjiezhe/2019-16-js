var fs = require('fs');
var http = require('http');
var url = require('url');

http.createServer(function(req,res){
    var pathname = req.url;
    // 当服务器接收到这次请求之后，把用fs的readFile方法读取到对应的文件，然后在吧读取的内容响应给客户端

    // 当浏览器解析html中的代码的时候，如果有link(href)/img(src)/script(src) 音视频(src)这些都会想服务器再次发送请求

    // 由于谷歌浏览器可以根据响应回来的内容自动识别文件的格式，但是IE浏览器不能够根据文件的类型做对应的content-type类型的处理，所以不能够像正常的解析html、css、js等文件
    console.log(req.url)
    if(pathname === '/9index.css'){
        res.setHeader('content-type','text/css')
    }
    if(pathname === '/9index.html'){
        res.setHeader('content-type','text/html')
    }
    if(pathname === '/5.png'){
        res.setHeader('content-type','image/jpeg')
    }
     if(pathname === '/9index.js'){
        res.setHeader('content-type',' text/javascript')
    }
    fs.readFile('.' + pathname,function(err,data){
        res.end(data)
    })


   

}).listen(9000,function(){
    console.log('9000端口已经启动成功')
})