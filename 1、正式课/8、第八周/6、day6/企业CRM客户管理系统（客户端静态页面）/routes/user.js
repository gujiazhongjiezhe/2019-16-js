let express = require('express');
let promiseFs = require('../promiseFS');
let route = express.Router();

route.post('/login',function(req,res){
    // post请求的参数会放到req.body身上
    let  {account,password} = req.body

    // 前段密码使用的是md5加密
    // 2、那用户传来的密码进行二次加密，把字符串删除前四位，删除后四位，然后倒叙
    password = password.substring(4).split('').reverse().join('').substring(4)
    // 3、到数据库中查找是否有符合该密码和用户名的这一项信息
   let result = req.$userdata.find(item=>{
       return (item.name === account || item.phone === account || item.email === account ) && item.password === password
   })
   if(result){
       // 在这里判断是否登录成功
       //根据咱们的result中的jobId这个属性，去job的文件里去寻找对应的对象，然后获取到这个对象里power属性所对应的值
       let curUer = req.$jobdata.find(item=>{
           return parseFloat(item.id) === parseFloat(result.jobId)
       });
       let power = curUer.power;
       req.session.userId = result.id;
       req.session.power = power;

       res.status(200);
       res.type('application/json');
       res.send({
           code:0,
           codeText:'OK',
           power:power
       })
   }else {
       res.status(200);
       res.type('application/json');
       res.send({
           code:1,
           codeText:'账户密码不匹配'
       })
   }
})

module.exports = route;