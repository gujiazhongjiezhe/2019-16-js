// 中间件：在我们创建完成服务和处理请求之前，提前要做的一些事前

// 服务器可以提前将咱们的json数据读取出来，提前的准备好(放到一个地方)当真正的请求来临的时候，你不在需要花费额外的时间再去读取，直接将数据拿来用就好了，一半情况下，我们是将数据放到请体上(req.body这个属性上，还可以把你请求的信息放到req.body上，每一个请求都可以直接从req.body上获取，【相当于放到一个中间宿主的身上】)

let express = require('express');
let app = express();
let bodyParser = require('body-parser');


// app.use(function(req,res,next){
//     console.log(300)
//     req.a = 5;
//     next() // 只要next不手动执行，他后面的方法是不会执行的
// })
// app.get('/index',function(req,res){
//     console.log(100)
//     console.log(req.a)

// });
// app.get('/login',function(req,res){
//     console.log(200)
//     console.log(req.a)
// })

app.listen(8080, function () {
    console.log('8080端口已经启动成功')
})

// 把客户端post请求传过来的参数转化为对象，放到req.body身上
app.use(bodyParser.urlencoded({
    extended:true // 这是固定的写法
}));

// 专门请求静态资源文件
app.use(express.static('./client'));


app.post('/login', function (req, res) {
    // console.log(req.query) // 只是神队get请求
    console.log(req.body)
    console.log(req)
})

