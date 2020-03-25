(function () {
    let $selectBox = $('.selectBox');
    let $searchInp = $('.searchInp');
    let $tableBox = $('.tableBox');
    let $tbody = $tableBox.find('tbody');
    let $pageBox = $('.pageBox');
    let $pageNum = $pageBox.find('.pageNum');
    let lx = window.location.href.queryURLParams().lx || '';
    let limit = 10;
    let page = 1;

    let render = function () {
        axios.get('customer/list', {
            params: {
                lx: lx,
                type: $selectBox.val(),
                search: $searchInp.val(),
                limit,
                page
            }
        }).then(res => {
            let {
                code,
                total,
                totalPage,
                data
            } = res;
            console.log(res)
            if (parseFloat(code) === 0) {
                let str = ``;
                data.forEach(item => {
                    str += `<tr>
                    <td class="w8">${item.name}</td>
                    <td class="w5">${parseFloat(item.sex)==1?"女":"男"}</td>
                    <td class="w10">${item.email}</td>
                    <td class="w10">${item.phone}</td>
                    <td class="w10">${item.weixin}</td>
                    <td class="w10">${item.QQ}</td>
                    <td class="w5">${item.type}</td>
                    <td class="w8">${item.userName}</td>
                    <td class="w20">${item.address}</td>
                    <td class="w14">
                        <a href="customeradd.html?customerId=${item.id}">编辑</a>
                        <a href="javascript:;">删除</a>
                        <a href="visit.html?customerId=${item.id}">回访记录</a>
                    </td>
            </tr>`
                });
                $tbody.html(str);

                // 渲染分页的数据
                let newStr = ``;
                page>1?str+=`<a href="javascript:;">上一页</a>`:null;

            }
        })
    }
    render()
})()