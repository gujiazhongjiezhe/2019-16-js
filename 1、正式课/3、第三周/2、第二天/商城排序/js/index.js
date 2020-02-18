/* 
需要从后台请求数据

1、创建一个变量，用来接收请求来的数据
2、利用ajax去请求数据，把数据请求来之后赋值给变量
    1、创建ajax实例
    2、打开一个请求连接，基于get完成同步请求
    3、监听服务器返回的信息状态，如果状态是200，而且状态码是4，证明请求成功了
    4、发送ajax请求
3、把请求来的数据赋值给变量接收
*/
let cardBox = document.getElementById('cardBox');
let data = null;
let xhr = new XMLHttpRequest;
xhr.open('get','./json/product.json',false);
xhr.onreadystatechange = function(){
    if(xhr.status === 200 && xhr.readyState === 4){
        data = xhr.responseText;
    }
}

xhr.send();
data = JSON.parse(data); //把字符串转化为对象

/* 
把数据渲染到页面
*/
function renderHtml(){
    // 利用模板字符串
    let htmlStr = ``;
    data.forEach((item)=>{
        // 把每一个item的时间、热度、价格自定义到li的结构上，方便以后使用
        htmlStr+=`<li data-hot = "${item.hot}" data-time = "${item.time}" data-price="${item.price}">
            <img src="${item.img}" alt="">
            <span>${item.title}</span>
            <span>上架时间：${item.time}</span>
            <span>热度：${item.hot}</span>
            <span>价格：${item.price}</span>
    </li>`
    });
    cardBox.innerHTML = htmlStr;
};
renderHtml();

let navList = document.getElementsByTagName('a'); // 获取页面的三个按钮
let cardList = document.getElementsByTagName('li'); // 获取页面所有的li元素
cardList = utils.toArray(cardList); // 把类数组转数组

for (var i = 0; i < navList.length; i++) {
    navList[i].index = i; // 给每一个a标签添加自定义属性index，属性值是当前的索引
    navList[i].flag = -1; // 给每一个a标签增加flag属性，用来记录升序和降序
    navList[i].onclick = function(){
        // this-->点击谁this就是谁，this就是当前点击的元素
        sortList.call(this);
        clearArrow.call(this);
        addArrow.call(this);
    }
}

function sortList(){
    this.flag *=-1;
    // this-->当前点击的元素
    let dataAry = ['data-time','data-hot','data-price'];// 属性映射表，通过当期点击按钮的索引，拿到映射表中的属性名

    /* 
    通过a标签身上的索引拿到对应的属性名
    然后通过属性名拿到li结构上对应的属性值
    */
    cardList.sort((a,b)=>{
        // this-->当前点击的元素
        a = a.getAttribute(dataAry[this.index]);
        b = b.getAttribute(dataAry[this.index]);

        
        // 如果this.index是0，说明你点击的是第一个按钮，想要按照时间排序，但是时间中有'-'不能够直接相减，的把'-'去掉
        if(this.index == 0){
            a = a.replace(/-/g,'');
            b = b.replace(/-/g,'');
        };
        // flag是1时是升序，flag是-1是为降序
        return (a-b)*this.flag;
    
    });

    // 把排好序的cardList在重新放回页面
    for (var i = 0; i < cardList.length; i++) {
       cardBox.appendChild(cardList[i])
    }
}

 function clearArrow(){
     // this-->当前点击的元素
     for (var i = 0; i < navList.length; i++) {
         if(this !== navList[i]){
            navList[i].children[0].classList.remove('bg');
            navList[i].children[1].classList.remove('bg');
            navList[i].flag = -1; // 把其余两个按钮的flag恢复默认值
         }

     }

 }
 function addArrow(){
     // this-->当前点击的元素
     let up = this.children[0];
     let down = this.children[1];

     // 如果flag>0说明是升序，如果flag<0说明是降序
     if(this.flag>0){
        up.classList.add('bg');
        down.classList.remove('bg');
     } else {
         down.classList.add('bg');
         up.classList.remove('bg');
     }
 }