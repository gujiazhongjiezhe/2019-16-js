(function(){

    let $userdepartment = $('.userdepartment'); // 获取部门列表
    let $userjob = $('.userjob'); // 获取职务列表

    let $username = $('.username'); // 获取用户名
    let $spanusername = $('.spanusername');

    let $man = $('#man');
    let $woman = $('#woman'); // 获取女人单选框

    let $useremail = $('.useremail'); // 获取邮箱
    let $spanuseremail = $('.spanuseremail');

    let $userphone = $('.userphone'); // 获取电话
    let $spanuserphone = $('.spanuserphone');

    let $userdesc = $('.userdesc'); // 获取描述
    let $submit = $('.submit'); // 获取确认提交按钮




    // 给下拉框绑定内容
    let selectBind = function(){
        let promise1 = axios.get('/department/list');
        let promise2 = axios.get('/job/list');
        axios.all([promise1,promise2]).then(res=>{
            // 他会等到上面的两个请求都成功之后才会执行这个then方法中的回调函数
            let [departmentRes,jobRes] = res;

            // 部门信息数据绑定
            if(parseFloat(departmentRes.code) == 0){
                // {
                //     code:0  
                //     codeText:'OK',
                //     data:[{
                //         id: 1,
                //         name: "总裁办",
                //         desc: ""
                //     },...]
                // }
                let str = ``;
                departmentRes.data.forEach(item=>{
                    str+=`<option value="${item.id}">${item.name}</option>`
                });
                 $userdepartment.html(str);
            }

            // 职务信息数据绑定
            if(parseFloat(jobRes.code) == 0){
                // {
                //     code:0  
                //     codeText:'OK',
                //     data:[{
                //         id: 1,
                //         name: "",
                //         desc: "",
                //         power:''
                //     },...]
                // }
               let str = ``;
               jobRes.data.forEach(item=>{
                   str+=`<option value="${item.id}">${item.name}</option>`
               });
               $userjob.html(str)

            }
        })
    }
    selectBind();

    // 新增用户页面
    // 从员工列表中点击编辑跳转过来，每一个用户都会有一个对应的userId

    let userId = window.location.href.queryURLParams()['userId'];
    let queryBaseInfo = function(){
        // 获取个人信息
        axios.get('/user/info',{
            params:{userId}
        }).then(res=>{
            if(parseFloat(res.code) === 0){
                // data:{
                //     id: 1,
                //     name: "珠峰培训",
                //     sex: 0,
                //     email: "1144709265@qq.com",
                //     phone: "18310612838",
                //     departmentId: 1,
                //     department: '总裁办',
                //     jobId: 1,
                //     job: '管理员',
                //     desc: "珠峰培训最高管理员账户"
                // }
                let {id,name,sex,email,phone,departmentId,jobId,desc} = res.data;
                $username.val(name);
                if(parseFloat(sex) === 1){
                    // 0代表男，1代表女
                    $woman.prop('checked',true)
                }
                $useremail.val(email);
                $userphone.val(phone);
                $userdesc.val(desc);

                $userdepartment.val(departmentId);
                $userjob.val(jobId)
            }
        })
    }
    if(userId){
        queryBaseInfo()
    }

    // 表单验证

    // 验证用户名
    let checkUsername = function(){
        let val = $username.val().trim();
        if(val.length === 0){
            $spanusername.html('用户名为必填，不能为空');
            return false;
        }
        $spanusername.html('');
        return true;

    }
    $username.on('blur',checkUsername);

    // 验证邮箱
    let checkUserEmail = function(){
        let val = $useremail.val().trim();
        let reg = /^([0-9a-zA-Z_\u4E00-\u9FA5])+@([0-9a-z])+(\.[a-z]+){1,2}$/;
         // 1404294396@qq.com
        if(val.length === 0){
            $spanuseremail.html('邮箱不能为空');
            return false;
        }
        if(!reg.test(val)){
            $spanuseremail.html('您输入的邮箱格式不对');
            return false;
        }
        $spanuseremail.html('');
        return true;   
    }
    $useremail.on('blur',checkUserEmail);

    let checkPhone = function(){
        let val = $userphone.val().trim();
        let reg = /^1[3-9]\d{9}$/;
        if(val.length == 0){
            $spanuserphone.html('不好意思妮，电话不能为空');
            return false;
        }
        if(!reg.test(val)){
            $spanuserphone.html('妮，电话格式不对');
            return false;
        }
            $spanuserphone.html('');
            return true;
    }
    $userphone.on('blur',checkPhone);

    $submit.click(function(){
        if(!checkUsername() || !checkUserEmail() || !checkPhone()){
            console.log('不能提交')
            return;
        }

        // axios
        let url = userId? '/user/update': '/user/add';
        // name=xxx&sex=0&email=xxx&phone=xxx&departmentId=1&jobId=1&desc=xxx
        axios.post(url,{
            userId: userId?userId:null,
            name:$username.val().trim(),
            sex:$woman.prop('checked')?1:0,
            email:$useremail.val().trim(),
            phone:$userphone.val().trim(),
            departmentId:$userdepartment.val(),
            jobId:$userjob.val(),
            desc:$userdesc.val().trim()
        }).then(res=>{
            if(parseFloat(res.code) === 0){
                alert('当前操作成功，即将返回列表',{
                    handled:()=>{
                        window.location.href = 'userlist.html'
                    }
                })
            }
        })
    })
})()
