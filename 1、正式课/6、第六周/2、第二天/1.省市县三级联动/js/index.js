(function(){
    // 1、获取json中的数据，
    // 2、循环数据中的每一项，获取到每一项中的省份，把所有省份都放到一个数组里，
    // 3、最后在循环这个数组，拼接成option标签，
    // 4、渲染到页面中
    let province = null; // 存储的是当前省
    let city = null; // 存储的是当前城市
    $.ajax({
        url:'json/regionData.json',
        async:false,
        success:function(data){
            console.log(data)
            // 获取到拥有所有省份的数组
            let arr = formData(0,data); // 获取所有的省，(以数组的格式)
            let str = bindHtml(arr); // 把省份渲染到页面
            $('#province').html(str);
            $('#province').change(function(){ // 给省的seletc绑定change事件，内容一旦发生变化，就触发
                province = this.value; // 把当前选中的省份赋值给全局变量
                let arr = formData(1,data); // 获取到当前省对应的城市(以数组的格式)
                $('#city').html(bindHtml(arr)); // 把城市渲染到页面
            });
            $('#city').change(function(){
                city = this.value; // 把当前选中的城市赋值给全局变量
                let arr = formData(2,data);
                $('#country').html(bindHtml(arr))
            })
        }
    });

    // 拿到data中对应的数据放到数组中
    function formData(level,data){
        let res = [];
        if(level === 0){
            // 获取省
             $.each(data,function(index,item){
            // console.log(item.name)
            // item是data的每一项，每一项的name属性就是省
            res.push(item.name);
        })
        }
        if(level === 1){
            // 获取当前省对应的所有的城市
            $.each(data,function(index,item){
                // item是data的每一项，每一项的name属性就是省
                // 如果name和当前选中的省相等，此条件就成立
               if(item.name === province){
                    // console.log(item)

                    // 循环city，city的每一项里的name字段就是城市
                    $.each(item.city,function(index,item){
                        // console.log(item.name)
                        res.push(item.name)
                    })
               }
            })
        }
        if(level === 2){
            // 获取当前城市对应的区域

            // $.each(data,function(index,item){
            //     // item ==》河北那个对象
            //     $.each(item.city,function(index,item){
            //         // item 
            //         // console.log(item.name)
            //         if(item.name === city){
            //             res = item.area;
            //         }
            //     })
            // })

            $.each(data,function(index,item){
                // item是data的每一项，每一项的name属性就是省
                // 如果name和当前选中的省相等，此条件就成立
               if(item.name === province){
                    // console.log(item)
                    // 循环city，city的每一项里的name字段就是城市
                    $.each(item.city,function(index,item){
                        // 如果item.name和当前选择的城市相等那此条件就成立
                        if(item.name === city){
                            res = item.area
                        }
                    });
               }
            });
        }
       
        return res;
    }
    // 把数组渲染成字符串的标签
    function bindHtml(arr){
        let str = `<option>请选择</option>`;
        $.each(arr,function(index,item){
            str+=`<option>${item}</option>`
        });
        return str
    }
})()