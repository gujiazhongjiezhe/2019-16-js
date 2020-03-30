let express = require('express');
let promiseFs = require('../promiseFS');
let route = express.Router();

route.post('/login', function (req, res) {
    // post请求的参数会放到req.body身上
    let { account, password } = req.body

    // 前段密码使用的是md5加密
    // 2、那用户传来的密码进行二次加密，把字符串删除前四位，删除后四位，然后倒叙
    password = password.substring(4).split('').reverse().join('').substring(4)
    // 3、到数据库中查找是否有符合该密码和用户名的这一项信息
    let result = req.$userdata.find(item => { // 
        return (item.name === account || item.phone === account || item.email === account) && item.password === password
    })

    if (result) {
        // 在这里判断是否登录成功
        //根据咱们的result中的jobId这个属性，去job的文件里去寻找对应的对象，然后获取到这个对象里power属性所对应的值
        let curUer = req.$jobdata.find(item => {
            return parseFloat(item.id) === parseFloat(result.jobId)
        });
        let power = curUer.power;
        // session：用于服务器存储，存储当前用户的登录状态
        req.session.userId = result.id;
        req.session.power = power;

        res.status(200);
        res.type('application/json');
        res.send({
            code: 0,
            codeText: 'OK',
            power: power
        })
    } else {
        res.status(200);
        res.type('application/json');
        res.send({
            code: 1,
            codeText: '账户密码不匹配'
        })
    }
})

//--------------------------------------------------------------------------------------------------------------------
// 用来验证用户是否登录
route.get("/login", function (req, res) {
    let userId = req.session.userId;
    if (userId) {
        res.status(200);
        res.type("application/json");
        res.send({
            code: 0,
            codeText: "OK"
        })
    } else {
        res.send({
            code: 1,
            codeText: "当前用户没有登录"
        })
    }
});

// 安全退出
route.get("/signout", function (req, res) {
    req.session.userId = null;
    req.session.power = null;
    res.send({
        code: 0,
        codeText: 'OK'
    })
})

route.get('/list', function (req, res) {
    let { departmentId, search } = req.query; // 参数的结构赋值
    departmentId = parseFloat(departmentId);
    if (departmentId !== 0) {
        req.$userdata = req.$userdata.filter(item => { // 过滤
            return parseFloat(item.departmentId) === departmentId;
        })
    }
    if (search !== '') {
        req.$userdata = req.$userdata.filter(item => { // 
            return item.name.includes(search) || item.phone.includes(search) || item.email.includes(search)
        })
    }

    req.$userdata = req.$userdata.map(item => { // 他的返回值是一个新的数组，[1,2,3,4,5] =>[5,5,5,5,5]
        let departmentId = item.departmentId;
        let jobId = item.jobId;
        // id: 1,
        // name: "珠峰培训",
        // sex: 0,
        // email: "1144709265@qq.com",
        // phone: "18310612838",
        // departmentId: 1,
        // department: '总裁办',
        // jobId: 1,
        // job: '管理员',
        // desc: "珠峰培训最高管理员账户"
        return {
            id: item.id,
            name: item.name,
            sex: item.sex,
            email: item.email,
            phone: item.phone,
            departmentId: departmentId,
            department: req.$departmentdata.find(item => parseFloat(item.id) === parseFloat(departmentId)).name,
            jobId: jobId,
            job: req.$jobdata.find(item => parseFloat(item.id) === parseFloat(jobId)).name,
            desc: item.desc
        }
    });
    // 返回给客户端；后台的数据串联关系；处理数据；
    // 后端：处理数据的；
    if (req.$userdata && req.$userdata.length > 0) {
        res.status(200);
        res.type("application/json");
        res.send({
            code: 0,
            codeText: "OK",
            data: req.$userdata
        });
        return;
    } else {

        res.send({
            code: 1,
            codeText: "没有找到匹配的项",
        });
    }

})

route.get("/info", function (req, res) {
    let { userId = req.session.userId } = req.query;
    // 通过用户的id找到对应的用户；
    let data = req.$userdata.find(item => parseFloat(item.id) === parseFloat(userId));
    // id: 1,
    // name: "珠峰培训",
    // sex: 0,
    // email: "1144709265@qq.com",
    // phone: "18310612838",
    // departmentId: 1,
    // department: '总裁办',
    // jobId: 1,
    // job: '管理员',
    // desc: "珠峰培训最高管理员账户"

    data = {
        id: data.id,
        name: data.name,
        sex: data.sex,
        email: data.email,
        phone: data.phone,
        departmentId: data.departmentId,
        department: req.$departmentdata.find(item => parseFloat(item.id) === parseFloat(data.departmentId)).name,
        jobId: data.jobId,
        job: req.$jobdata.find(item => parseFloat(item.id) === parseFloat(data.jobId)).name,
        desc: data.desc
    }
    if (data.id) {
        res.status(200);
        res.type("application/json");
        res.send({
            code: 0,
            codeText: "OK",
            data: data
        });
        return;
    } else {
        res.status(200);
        res.type("application/json");
        res.send({
            code: 1,
            codeText: "没有找到对应的信息",
        });
    }
});
//-----------------------------------------------------------------
// 删除员工
route.get("/delete", function (req, res) {
    // 获取登录用户的权限校验，对于重要的操作，服务器进行二次权限校验；
    let power = req.session.power;
    if (!power.includes("userhandle")) {
        // 
        res.status(401);// 没有权限；
        res.send({
            code: 1,
            codeText: "您无权限删除"
        });
        return;
    }
    let { userId } = req.query;
    let flag = req.$userdata.find(item => {
        return parseFloat(item.id) === parseFloat(userId)
    })

    if (flag) { // userId = 5
        // 如果存在，需要把这一项过滤出去，再把最新的数据写入user.json中
        req.$userdata = req.$userdata.filter(item => parseFloat(item.id) !== parseFloat(userId));
        promiseFs.writeFile("./json/user.json", req.$userdata).then(() => {
            res.status(200);
            res.type("application/json");
            res.send({
                code: 0,
                codeText: "OK",
            });
        }).catch(err => {
            res.status(200);
            res.type("application/json");
            res.send({
                code: 1,
                codeText: "删除失败",
            });
        })
    }
})
// 新增用户
route.post("/add", function (req, res) {
    let { name, sex, email, phone, departmentId, jobId, desc } = req.body;
    req.$userdata.push({
        //让新增一项id是最后一项的索引+1；如果当前为空，那么给其默认值1；
        id: req.$userdata.length === 0 ? 1 : req.$userdata[req.$userdata.length - 1]['id'] + 1,
        name,
        password: "8376ac810bb9f231d28fcf1f",
        sex,
        email,
        phone,
        departmentId,
        jobId,
        desc,
        time: new Date().getTime(),
        state: 0
    });
    promiseFs.writeFile("./json/user.json", req.$userdata).then(() => {
        res.status(200);
        res.type("application/json");
        res.send({
            code: 0,
            codeText: "OK",
        });
    }).catch(err => {
        res.status(200);
        res.type("application/json");
        res.send({
            code: 1,
            codeText: "新增失败",
        });
    })
})

// 修改员工信息
route.post("/update", function (req, res) {
    let { userId } = req.body;
    req.$userdata = req.$userdata.map(item => {
        if (parseFloat(item.id) === parseFloat(userId)) {
            return {

                ...item,
                ...req.body
            }
        };
        // item = {name:1,age:2,sex:0};
        // req.body = {name:1,age:3}
        // return {
        //     ...item,
        //     ...req.body
        // }
        return item;
    });
    promiseFs.writeFile('./json/user.json', req.$userdata).then(() => {
        res.status(200);
        res.type("application/json");
        res.send({
            code: 0,
            codeText: "OK",
        });
    }).catch(err => {
        res.status(200);
        res.type("application/json");
        res.send({
            code: 1,
            codeText: "修改失败",
        });
    })
})

module.exports = route;