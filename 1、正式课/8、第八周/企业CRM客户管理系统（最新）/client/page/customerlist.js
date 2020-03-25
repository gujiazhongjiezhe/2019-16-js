(function () {
    let $selectBox = $('.selectBox'); // 获取下拉框
    let $searchInp = $('.searchInp');
    let $tableBox = $('.tableBox');
    let $tbody = $tableBox.find('tbody');


    let $pageBox = $('.pageBox');
    let $pageNum = $('.pageNum');

    let lx = window.location.href.queryURLParams().lx || '';

    let limit = 10; // 每次请求数据的个数
    let page = 1; // 当前的页数


    let render = function () {

        // lx=my&type=''&search=''&limit=10&page=1
        axios.get('/customer/list', {
            params: {
                lx: lx,
                type: $selectBox.val(),
                search: $searchInp.val(),
                limit,
                page

            }
        }).then(res => {
            let {
                data,
                code,
                total,
                totalPage
            } = res
            if (parseFloat(code) === 0) {
                let str = ``;
                data.forEach(item => {
                    let {name,sex,email,phone,weixin,QQ,type,userName,address} = item
                    str += `
                    <tr>
                    <td class="w8">${name}</td>
                    <td class="w5">${parseFloat(sex) === 1?'女':'男'}</td>
                    <td class="w10">${email}</td>
                    <td class="w10">${phone}</td>
                    <td class="w10">${weixin}</td>
                    <td class="w10">${QQ}</td>
                    <td class="w5">${type}</td>
                    <td class="w8">${userName}</td>
                    <td class="w20">${address}</td>
                    <td class="w14">
                        <a href="">编辑</a>
                        <a href="">删除</a>
                        <a href="">回访记录</a>
                    </td>
                </tr>
                    `
                })
                $tbody.html(str);

                // 渲染分页的数据
                // <a href="javascript:;">上一页</a>
                // <ul class="pageNum">
                //     <li class="active">1</li>
                //     <li>2</li>
                //     <li>3</li>
                //     <li>4</li>
                //     <li>5</li>
                // </ul>
                // <a href="javascript:;">下一页</a>
                
                str = ``;
                page>1?str+= `<a href="javascript:;">上一页</a>`:null;
                str+=`<ul class="pageNum">`
                    for (var i = 1; i <= totalPage; i++) {
                       str+=`<li class="${i === page?'active':''}">${i}</li>`
                    }
                str+=`</ul>`
                page<totalPage?str+=`<a href="javascript:;">下一页</a>`:null;
                $pageBox.html(str);
            }
        })
    }
    render()
})()