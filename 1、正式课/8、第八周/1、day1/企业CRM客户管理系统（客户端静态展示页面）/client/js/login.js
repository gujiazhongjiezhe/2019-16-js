// 获取用户名和密码，然后发颂请求，请求成功之后进行提示框提示，3s之后跳转到首页
$(function(){
    // 避免全局变量的污染
    let $userName = $('.userName'),
    $password = $('.userPass'),
    $submit = $('.submit');

    // 给当前登录绑定点击事件
    $submit.click(function(){
        let userName = $userName.val().trim();
        let password = $password.val().trim();
        console.log(userName,password)

    // 进行表单验证
    if(!userName || !password){
        alert('用户名和密码不能为空');
        return;
    }
    // 需要md5进行加密，会生成一个32位的字符串，在后端也会有一个md5，他会进行解析当前加密之后的密码和后台存储一不一致，如果一致，说明改密码是正确的
    password = md5(password);
    // console.log(password)

    axios.post('/user/login',{
        account:userName,
        password:password
    }).then(res=>{
        console.log(res)
        let {code,codeText,power} = res
        // power是一个字段，里面包含了用户的权限自信息
        if(parseFloat(code) === 0){
            alert('恭喜您登录成功',{
                handled:function(){
                    // 当alert弹框消失之后，执行
                    localStorage.setItem('power',power);
                    // 弹框消失之后，跳转到首页
                    window.location.href = 'index.html'
                }
            });

        }
        else {
            alert('您的用户名和密码不匹配，请重试');
        }
    })

    })
})