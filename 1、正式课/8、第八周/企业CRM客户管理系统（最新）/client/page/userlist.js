$(function () {
    let $tableBox = $('.tableBox'); // 获取的table大盒子
    let $tbody = $tableBox.children('tbody'); // 获取table的内容区
    let $thead = $tableBox.children('thead'); // 获取table的头部

    let $theadTH = $thead.find('th'); // 获取头部所有的th标签

    let $deleteAll = $('.deleteAll'); // 获取删除按钮
    let $selectBox = $('.selectBox'); // 获取下拉框
    let $searchInp = $('.searchInp'); // 获取模糊搜索框

    //    权限校验
    let power = localStorage.getItem('power') || '';

    let checkPower = function () {
        if (!power.includes('userhandle')) {
            // 如果没有对应的权限，应该做的处理
            $deleteAll.remove(); // 删除批量删除的按钮
            $theadTH.eq(0).remove(); // 删除复选框
            $theadTH.eq($theadTH.length - 1).remove(); // 删除操作
        }
    }
    checkPower();

    // 请求所有的用户信息，完成对用户列表的渲染
    function render() {
        let departmentId = $selectBox.val(); // 部门编号
        let search = $searchInp.val(); //  模糊搜索的内容
        return axios.get('/user/list', {
            params: {
                departmentId,
                search
            }
        }).then(res => {
            console.log(res)
            if (res.code == 0) {
                // 数据渲染
                return res.data; // return的返回值会传递给下一个then中的回调函数
            }
        }).then(function (data) {
            // {
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
            let str = ``;
            data.forEach(item => {
                let {
                    id,
                    name,
                    sex,
                    department = '--',
                    job = '',
                    email = '--',
                    phone = '--',
                    desc = '--'
                } = item;
                str += `<tr data-id="${id}" data-name="${name}">
                ${power.includes('userhandle')?`<td class="w3"><input type="checkbox"></td>`:``}
				
				<td class="w10">${name}</td>
				<td class="w5">${parseFloat(sex) === 0?'男':'女'}</td>
				<td class="w15">${department}</td>
				<td class="w10">${job}</td>
				<td class="w10">${email}</td>
				<td class="w15">${phone}</td>
                <td class="w20">${desc}</td>
                ${power.includes('userhandle')?`<td class="w12">
					<a href="useradd.html?userId=${id}">编辑</a>
                    <a href="javascript:;">删除</a>
                    ${power.includes('resetpassword')?`<a href="javascript:;">重置密码</a>`:``}
					
				</td>`:``}
				
			</tr>`
            });
            $tbody.html(str)
        }).catch(function () {
            $tbody.html('')
        }).then(function () {
            handleCheckBox()
        })
    }

    // 先渲染select下拉框
    let seletcBind = function () {
        return axios.get('/department/list').then(res => {
            if (parseFloat(res.code) === 0) {
                // 说明数据请求成功
                let str = `<option value="0">全部</option>`
                res.data.forEach(item => {
                    str += `<option value="${item.id}">${item.name}</option>`
                });
                $selectBox.html(str);
            }
        });
    }
    seletcBind().then(function () {
        // 在这里去执行渲染整个列表的代码
        render()
    });

    // 根据下拉框和搜索框的数据去请求对应的列表
    let handleFilter = function () {
        $selectBox.on('change', render);
        $searchInp.on('keydown', function (e) {
            // 当键盘按下的时候就会执行
            // 而且必须按下的是enter键才行
            if (e.keyCode === 13) {
                // 当按下render的时候，重新执行render
                render()
            }
        })
    }
    handleFilter();

    //================================================================================
    // 周二的茬

    // 利用事件委托事件员工操作
    let handleDelegate = function () {
        $tbody.click(function (e) {
            let target = e.target;
            let tagName = target.tagName; // 事件源大写的标签名
            let val = target.innerText; // 获取事件源的内容
            let $target = $(target);

            let $grandParent = $target.parent().parent();
            let $userName = $grandParent.attr('data-name');
            let userId = $grandParent.attr('data-id');

            // 重置密码
            if (tagName === 'A' && val === '重置密码') {
                alert(`您确定要把${$userName}的密码重置吗`, {
                    title: '警告，当前操作非常重要',
                    confirm: true,
                    handled: res => {
                        // console.log(res)
                        // 当点击确定的时候，res的值是CONFIRM，但是取消的时候res的值是CANCEL
                        if (res === 'CONFIRM') {
                            axios.post('/user/resetpassword', {
                                userId,
                                password: ''
                            }).then(res => {
                                if (parseFloat(res.code) == 0) {
                                    alert('恭喜您密码修改成功')
                                } else {
                                    alert('很遗憾，密码修改失败，请重新修改密码')
                                }
                            })
                        }
                    }
                })
            }

            // 删除
            if (tagName === 'A' && val === '删除') {
                alert(`警告，您确定要删除${$userName}吗`, {
                    title: '警告，此操作非常重要',
                    confirm: true,
                    handled: res => {
                        if (res === 'CONFIRM') {
                            axios.get('/user/delete', {
                                params: {
                                    userId
                                }
                            }).then(res => {
                                if (parseFloat(res.code) === 0) {
                                    render();

                                }
                            })
                        }
                    }
                })
            }

            // 编辑


        })
    }
    handleDelegate()



    // 全选和非全选(为啥函数在声明之前就可以使用)
    let handleCheckBox = function () {
        let $checkHead = $theadTH.find('input');
        let $checks = $tbody.find('input');
        $checkHead.click(function () {
            // console.log($(this).prop('checked'))
            // 当点击头部的复选框的时候，把头部复选框的状态给到下边每一个复选框
            $checks.prop('checked', $(this).prop('checked'));
            // attr:给普通元素增加行内属性
            // prop：给表单元素增加行内属性

            // val：获取表单元素的内容
            // html/text:获取普通元素的内容
        });

        // 给下边每一个复选框绑定点击事件
        $checks.click(function () {
            let flag = true;
            // 检测当前下边的复选框是都选中，还是有一个未选中
            $checks.each(function (index, item) {
                // 如果下边有一个复选框没有勾选，那就把flag置为false
                if ($(item).prop('checked') === false) {
                    flag = false;
                    return; // 终止循环
                }
            })
            $checkHead.prop('checked', flag);
        })
        // 实现批量删除

        function deleteX(index, $selects) { // index=0
            // 采用采用循环递归的方式删除你选中的每一项信息
            let $item = $selects.eq(index);

            // 如果index大于等于最后一项索引了，就立即停止递归
            if (index >= $selects.length) { // 4
                return;
            }
            let userId = $item.parent().parent().attr('data-id');
            axios.get('/user/delete', {
                params: {
                    userId
                }
            }).then(res => {
                if (parseFloat(res.code) === 0) {
                    deleteX(index + 1, $selects);
                }
            })
        }
        $deleteAll.click(function () {
            let $selects = $tbody.find('input').filter((index, item) => {
                return $(item).prop('checked') === true;
            });
            // 如果当前用户没有选择内容，就提示用户，函数执行结束
            if ($selects.length === 0) {
                alert('请先选择需要删除的内容');
                return;
            }
            alert(`请确定要删除${$selects.length}条数据吗`, {
                title: '警告，当前操作很重要',
                confirm: true,
                handled: msg => {
                    if (msg === 'CONFIRM') {
                        deleteX(0, $selects);
                    }
                }
            })
        })
    }
    // handleCheckBox () // 页面的用户信息渲染是异步的，但是咱这个函数执行时同步，所以在函数执行的时候页面还没有渲染，所以拿不到input  

})