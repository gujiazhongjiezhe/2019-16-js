(function(){
    let $userdepartment = $('.userdepartment');
    let $userjob = $('.userjob');

    let $username = $('.username');
    let $spanusername=$(".spanusername");
    let $man=$("#man");
    let $woman=$("#woman"),
    $useremail=$(".useremail"), 
    $spanuseremail=$(".spanuseremail"),
    $userphone=$(".userphone"),
    $spanuserphone=$(".spanuserphone"),
    $userdesc=$(".userdesc"),
    $submit=$(".submit"); 

    // 下拉内容的绑定
    let selectBind = function(){
       
        let promise1 = axios.get("department/list");
        let promise2 = axios.get('job/list');
        axios.all([promise1,promise2]).then(res=>{
            //当上面两个数据都成功之后，会执行这个then方法，并且将两次请求的数据被数组包含，传递给then的第一个成功的回调函数中；
            let [departmentRes,jobRes] = res;
            // 部门信息绑定
            console.log(res)
            if(parseFloat(departmentRes.code) === 0){
                let str = ``;
                departmentRes.data.forEach(item=>{
                    str+=`<option value="${item.id}">${item.name}</option>`
                });
                $userdepartment.html(str)
            }

            // 职务信息绑定
            if(parseFloat(jobRes.code) === 0){
                let str = ``;
                jobRes.data.forEach(item=>{
                    str+=`<option value="${item.id}">${item.name}</option>`
                });
                $userjob.html(str)
            }
        })
    }
    selectBind();

    // 在员工列表中点击编辑跳转过来，每一个用户都会对应一个userId

    // 直接点击新增员工
    let userId = window.location.href.queryURLParams().userId;
    let queryBaseInfo = function(){
        axios.get('user/info',{
            params:{userId}
        }).then(res=>{
            if(parseFloat(res.code) === 0){
                let {name,sex,email,phone,departmentId,jobId,desc} = res.data;

                $username.val(name);
                if(parseFloat(sex) === 1){
                    // 默认是男选中
                    $woman.prop('checked',true);
                };
                $useremail.val(email);
                $userphone.val(phone);
                $userdesc.val(desc);
                $userdepartment.val(departmentId);
                $userjob.val(jobId);
            }
        })
    }
    if(userId){
        queryBaseInfo();
    }

    // 进行表单验证

    // 验证用户名
    let checkUserName = function(){
        let usernameVal = $username.val().trim();
        if(usernameVal.length === 0){
            $spanusername.html('用户名为必填，不能为空！');
            return false;
        }
        $spanusername.html("");
        return true;
    }
    $username.on('blur',checkUserName)

    // 邮箱验证
    let checkEmail = function(){
        let useremailVal = $useremail.val().trim();
        let reg = /^[0-9a-zA-Z_\u4E00-\u9FA5]+@[0-9a-zA-Z_]+(\.[0-9a-zA-Z_]+)+$/;
        if(useremailVal.length === 0){
            $spanuseremail.html('邮箱为必填项，不能为空！');
            return false;
        }
        if(!reg.test(useremailVal)){
            $spanuseremail.html('邮箱格式不正确！');
            return false;
        }
        $spanuseremail.html('');
        return true;
    }
    $useremail.on('blur',checkEmail);

    // 电话验证
    let checkPhone = function(){
        let userphoneVal = $userphone.val().trim();
        let reg = /^1\d{10}$/;
        if(userphoneVal.length === 0){
            $spanuserphone.html('电话不能为空');
            return false;
        }
        if(!reg.test(userphoneVal)){
            $spanuserphone.html('电话格式不正确');
            return false;
        }
        $spanuserphone.html('');
        return true
    }
    $userphone.on('blur',checkPhone);

    // 确认点击提交
    $submit.click(function(){
        // 需要先进行表单验证，只要有一个表单验证不通过，就不能发送请求
        if(!checkUserName() || !checkEmail() || !checkPhone()){
            return;
        }
        // 判断当前是发送新增接口还是修改接口
        let url = userId ? 'user/update' : 'user/add';

        axios.post(url,{
            userId:userId?userId : null,
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
                    handled:function(){
                        window.location.href = 'userlist.html'
                    }
                })
            }
        })
    })
})()

