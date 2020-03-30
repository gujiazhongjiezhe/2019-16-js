let express = require('express');
let app = express();

app.use(function(req,res,next){
    // 设置允许的请求地址，*代表所有的路径
    res.header('Access-Control-Allow-Origin','http://127.0.0.1:5500');
    // 设置允许跨域的请求方式
    res.header('Access-Control-Allow-Methods',"GET,POST");
    next();
})
app.get('/index',function(req,res){
    res.send('哈哈')
})
app.listen(8080,function(){
    console.log('8080端口已经启动成功')
})