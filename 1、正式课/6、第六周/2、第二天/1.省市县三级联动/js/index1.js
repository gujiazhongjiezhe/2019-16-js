(function () {
    // 1、获取json中的数据，循环data中的每一项，获取到每一项中的省份，然后把所有的省份放到一个数组里；最后在循环这个数组，拼接成option标签，最后渲染到页面
    let val = null; // 代表当前选中的省
    let city = null;
    $.ajax({
        url: 'json/regionData.json',
        type: 'get',
        async: false,
        success: function (data) {
            let arr = formData(0, data); // ['河北','北京']
            //    let str = bindHtml(arr);
            $('#province').html(bindHtml(arr)) // 放字符串的option标签
            $('#province').change(function () {
                console.log(this.value)
                val = this.value; // 把点前选中的省赋值给全局变量val，方便以后调用
                let arr = formData(1, data);
                $('#city').html(bindHtml(arr));
                $('#country').html(bindHtml([]))
            })
            $('#city').change(function(){
               city = this.value;
               let arr = formData(2,data);
               $('#country').html(bindHtml(arr))
            })
        }
    });

    function formData(level, data) {
        let res = [];
        if (level == 0) {
            $.each(data, function (index, item) {
                res.push(item.name)
            });
        }
        if(level == 1){
            // 获取当前省对应的所有市区
            $.each(data,function(index,item){
                if(item.name === val){
                    console.log(item)
                    $.each(item.city,function(index,item){
                        res.push(item.name)
                    })
                }
            })
        }
        if(level === 2){
            // 获取当前市对应的所有区域
            $.each(data,function(index,item){
                $.each(item.city,function(index,item){
                    // console.log(item)
                    if(city === item.name){
                        // console.log(item)
                        res =item.area
                    }
                })
            })
        }
        return res;
    };

    function bindHtml(arr) {
        let str = `<option>请选择</option>`;
        $.each(arr, function (index, item) {
            str += `<option>${item}</option>`
        });
        return str
    }
})()