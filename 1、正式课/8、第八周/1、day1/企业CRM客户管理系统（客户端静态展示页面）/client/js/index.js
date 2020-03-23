$(function () {
    // 形成一个闭包，保护里边的变量不受外界干扰
    let power = localStorage.getItem('power');
    // localStorage.getItem如果获取不到，那对应的值就是null
    if (power === null) {
        alert('您的登录有问题，请重新登录！', {
            handled: function () {
                window.location.href = 'login.html'
            }
        })
    }


    // power存储的是用户的权限信息，咱们可以通过power的内容进行控制那些元素的显示隐藏

    let str = `
    <div class="itemBox">
        <h3>
            <i class="iconfont icon-yuangong"></i>
            员工管理
        </h3>
        <nav class="item">
            <a href="page/userlist.html" target = "_iframe">员工列表</a>
            ${power.includes('userhandle') ? `<a href="useradd.html" target = "_iframe">新增员工</a>`:``}
        </nav>
    </div>

    <div class="itemBox">
        <h3>
            <i class="iconfont icon-guanliyuan"></i>
            部门管理
        </h3>
        <nav class="item">
            <a href="page/departmentlist.html" target = "_iframe">部门列表</a>
           ${power.includes('departhandle') ? `<a href="page/departmentadd.html" target = "_iframe">新增部门</a>`:``} 
        </nav>
    </div>
    
    <div class="itemBox">
    ${power.includes('jobhandle') ? `<h3>
            <i class="iconfont icon-zhiwuguanli"></i>
            职务管理
        </h3>
        <nav class="item">
            <a href="page/joblist.html" target = "_iframe">职务列表</a>
            <a href="page/jobadd.html" target = "_iframe">新增职务</a>
        </nav>`:``}
        
    <div class="itemBox">
            <h3>
                <i class="iconfont icon-kehuguanli"></i>
                客户管理
            </h3>
            <nav class="item">
                <a href="page/customerlist.html?lx=my" target = "_iframe">我的客户</a>
                ${power.includes('allcustomer')?`<a href="page/customerlist.html?lx=all" target = "_iframe">全部客户</a>`:``}
                <a href="page/customeradd.html" target = "_iframe">新增客户</a>
            </nav>
        </div>
	</div>
			
    `;
    $('.menuBox').html(str)
})