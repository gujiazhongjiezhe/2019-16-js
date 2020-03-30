let express = require('express');
let app = express();

app.use(function(req,res,next){

    // *代表所有的url都可以请求
    res.header('Access-control-Allow-Origin','*');
    res.header('Access-control-Allow-MEthods','GET,POST');

    next();
})
app.get('/index',function(req,res){
    res.send('哈哈')
})
app.listen(8888,function(){
    console.log('8888端口已经启动成功')
})