let express = require('express');
let promiseFs = require('./promiseFS');
let bodyparser = require('body-parser');
let session = require('express-session');

let app = express();
app.listen(8888,function(){
    console.log('8888端口已经监听成功')
});

// 把处理session的中间件设置上，req的session就可以直接来用了

// 在session中会生成一个session-id，而且客户端利用cookie来保存这个session-id的加密的信息，当咱们客户端发送请求的时候，会把cookie携带到请求头里面，服务器接收到cookie中的session-id之后和自己的存储的session中的id进行比对，如果能够匹配一直，允许访问
app.use(session({
    secret: 'ZFPX',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60*24*30  // 默认是毫秒
    }
}));

// 将post请求的信息放到req.body身上
app.use(bodyparser.urlencoded({
    extended:true
}));

// 服务器启动之后，发送请求之前
app.use(function(req,res,next){
    let p1 = promiseFs.readFile('./json/user.json');
    let p2 = promiseFs.readFile('./json/customer.json');
    let p3 = promiseFs.readFile('./json/visit.json');
    let p4 = promiseFs.readFile('./json/department.json');
    let p5 = promiseFs.readFile('./json/job.json');

    Promise.all([p1,p2,p3,p4,p5]).then(function(data){
        let [$userdata,$customerdata,$visitdata,$departmentdata,$jobdata] = data;
        // 我把这些json数据放到请求信息req身上
        req.$userdata = JSON.parse($userdata);
        req.$customerdata = JSON.parse($customerdata);
        req.$visitdata = JSON.parse($visitdata);
        req.$departmentdata = JSON.parse($departmentdata);
        req.$jobdata = JSON.parse($jobdata);
        next()
    }).catch(res=>{
        res.status(500) // 服务器未知的错误
        res.send(res)
    })

});

// 构建路由
app.use("/user", require("./routes/user"));




app.use(express.static('./client')); // 处理静态文件

app.use((req,res)=>{
    res.status(404);
    res.send('您访问的资源文件不存在')
});


