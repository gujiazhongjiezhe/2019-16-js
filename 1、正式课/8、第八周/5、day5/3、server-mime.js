// mime：第三方模块
// 内置模块：安装node的时候自动就下载了

let http = require('http');
let mime = require('mime');
let fs = require('fs');
let url = require('url'); // 处理路径的
// console.log(mime.getType('/index.png'))
http.createServer(function(req,res){
    let {pathname,query} = url.parse(req.url,true);
    console.log(query)
    // mime：在mime身上有一个getType，会根据文件的后缀名，返回对应的content-type的类型
    
    fs.readFile('.'+ pathname,function(err,data){
        res.setHeader('content-type',mime.getType(pathname))
        res.end(data)
    })

}).listen(8080,function(){
    console.log('8080端口已经启动成功')
})
