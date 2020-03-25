$(function () {
    let $tableBox = $('.tableBox');
    let $tbody = $tableBox.children('tbody');
    let $thead = $tableBox.children('thead');
    let $theadTh = $thead.find('th');
    let $deleteAll = $('.deleteAll');
    let $selectBox = $('.selectBox');
    let $searchInput = $('.searchInp');

    let power = localStorage.getItem('power') || '';
    // 权限校验

    function checkPower() {
        if (!power.includes('userhandle')) {
            $deleteAll.remove();
            $theadTh.eq(0).remove();
            $theadTh.eq($theadTh.length - 1).remove();
        }
    }
    checkPower();



    // 获取所有用户的通讯录
    function render() {
        let departmentId = $selectBox.val();
        let search = $searchInput.val().trim();
        return axios.get('/user/list', {
            params: {
                departmentId,
                search
            }
        }).then(res => {
            let {
                code,
                data
            } = res;
            if (parseFloat(code) === 0) {
                // 请求成功
                return data;

            }
        }).then(data => {
            let str = ``;
            data.forEach(item => {
                let {
                    id,
                    name,
                    sex = 0,
                    department = '--',
                    job = '--',
                    email = '--',
                    phone = '--',
                    desc = '--'
                } = item
                str += `<tr data-id="${item.id}" data-name="${item.name}">
                ${power.includes("userhandle")?`<td class="w3"><input type="checkbox"></td>`:``}
                <td class="w10">${name}</td>
                <td class="w5">${parseFloat(sex)===0?"男":"女"}</td>
                <td class="w15">${job}<td>
                <td class="w10">${department}</td>
                <td class="w10">${email}</</td>
                <td class="w15">${phone}</td>
                <td class="w20">${desc}</td>
                ${power.includes("userhandle")?`<td class="w12">
                    <a href="useradd.html?userId=${id}">编辑</a>
                    <a href="javascript:;">删除</a>
                    ${power.includes("resetpassword")?`<a href="javascript:;">重置密码</a>`:``}
                </td>`:``}
            </tr>`
            })
            $tbody.html(str)
        }).catch(()=>{
            $tbody.html("");
        })

    }
    let selectBind = function () {
        return axios.get('/department/list').then(res => {
            if (parseFloat(res.code) === 0) {
                //说明数据请求成功
                let str = `<option value="0">全部</option>`
                res.data.forEach(item => {
                    str += `<option value="${item.id}">${item.name}</option>`
                });
                $selectBox.html(str);

            }
        })
    }
    selectBind().then(() => {
        render()
    })

    // 根据下拉框和搜索框进行筛选对应的数据
    let handleFilter = function () {
        $selectBox.on('change', render);
        $searchInput.on('keydown',function(e){
            if(e.keyCode === 13){
                //当按下enter时，在重新render
                render()
            }
        })
    }
    handleFilter()
})