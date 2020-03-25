$(function () {
    // 形成一个闭包，保护里边的变量不受外界干扰
    let power = localStorage.getItem('power');
    // localStorage.getItem如果获取不到，那对应的值就是null
    if (power === null) {
        alert('您的登录有问题，请重新登录！', {
            handled: function () {
                window.location.href = 'login.html';
                return;
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
            ${power.includes('userhandle') ? `<a href="page/useradd.html" target = "_iframe">新增员工</a>`:``}
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
        
    </div>  
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
	
			
    `;
    $('.menuBox').html(str);

    // 首页的业务处理
    $(function () {
        let $hearder = $('.headerBox');
        let $baseBox = $('.baseBox');
        let singoutBtn = $baseBox.children('a'); // 获取点击退出的按钮
        let $spanName = $baseBox.children('span'); // 获取显示名字的span元素

        let $footer = $('.footer');
        let $container = $('.container');

        let $menuBox = $('.menuBox');
        let $itemBox = $menuBox.find('.itemBox') // 获取左侧的左右导航

        let $navList = $('.navBox a'); // 获取切换页面的a标签

        let $iframeBox = $('.iframeBox'); // 获取iframe标签

        // 动态计算出container的高度
        function computed() {
            let winH = $(window).height();
            $container.css('height', winH - $hearder.outerHeight() - $footer.outerHeight())
        }
        computed();
        $(window).on('resize', computed);

        // 每一次进入首页都需要验证用户是否需要登录

        axios.get('/user/login').then(res => {
            if (parseFloat(res.code) === 0) {
                // 如果code是0.说明用户登录成功了
                return axios.get('/user/info'); // axios的返回值是一个promise的实例
            } else {
                alert('您还没有登录，请先去登录', {
                    handled: function () {
                        // 为了防止非法的情趣，直接跳转到登录页
                        window.location.href = 'login.html';
                    }
                });
                return Promise.reject(); // 返回一个失败的promise的实例
            }
        }).then(res => {
            // 把用户的名字设置到右上角
            if (parseFloat(res.code) === 0) {
                let data = res.data;
                $spanName.html(`热烈欢迎：${data.name}`)
            }
        });

        // 安全退出
        singoutBtn.click(function(){
            axios.get('/user/signout').then(res=>{
                if(parseFloat(res.code) === 0){
                    // 把本地存储清空
                    localStorage.removeItem('power');
                    window.location.href = 'login.html'
                }
            })
        })

        // 基于事件委托(事件冒泡)实现菜单的折叠
        $menuBox.click(function(e){
            // console.log(e.target.tagName)
            let target = e.target; // 当前元素
            if( target.tagName == 'H3'){
                $(target).next().stop().slideToggle(300) // 让菜单收齐，或者展开
            }
        })


        // 实现切换组织和客户
        let $organize = $itemBox.filter(':lt(3)'); // 获取索引小于3的元素(获取前三个菜单)
        let $customer = $itemBox.eq(3);// 获取最后一个菜单
        let initIndex = 0;
        // console.log($organize,$customer)

        // 为了防止用户刷新改变当前显示的页面
        // 如果页面的HASH是，说明页面展示的客户管理，要把initIndex改为1
        let HASH = window.location.href.queryURLParams()['HASH'] || 'organize';
        HASH === 'customer' ? initIndex = 1:null
        change(initIndex); // 页面加载的时候默认执行一次
        function change(index){
            $navList.eq(index).addClass('active').siblings().removeClass('active'); // 给当前点击的a标签加上对应的样式
            if(index === 0){
                 // 如果index等于0，说明点击的是第一个a标签，咱们要把前三个菜单显示，把最后一个菜单隐藏
                $organize.css('display','block');
                $customer.css('display','none');
                $iframeBox.attr('src','page/userlist.html'); // 让组织管理默认显示用户列表页
            }
            else {
                 // 如果index等于1，说明点击的是第二个a标签，咱们要把前三个菜单隐藏，把最后一个菜单显示
                $organize.css('display','none');
                $customer.css('display','block');
                $iframeBox.attr('src','page/customerlist.html');
                // 让客户管理默认显示客户列表页
            }
        }

        //给上边两个a标签绑定点击事件
        $navList.click(function(){
            let index = $(this).index(); // 获取当前元素的索引
            // console.log(index)
            change(index)
        })
    })

})
