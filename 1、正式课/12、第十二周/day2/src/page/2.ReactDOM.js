import React from 'react';
import ReactDOM from 'react-dom';

console.log(ReactDOM)

// 1、react元素，
// 2、在一个js文件中，只能有一个render函数，(将虚拟的dom元素转化成真实的dom元素，然后渲染到根元素root中)如果出现课多了，那后面会覆盖前面的
// 3、react元素只能有一个根元素
// let a = <div>1</div><div>2</div>;
// ReactDOM.render(a,document.querySelector('#root'));

// 4、render的渲染是同步的
// 5、render支持第三个参数，第三个参数是一个回调函数
// 6、当render执行的时候，会把根元素中的多有的东西进行替换
// 7、ReactDOM.render的渲染是同步的，当dom真正挂载完成之后，才会执行下面的代码

let bar = <div>
    <span id="ss">666</span>
</div>


ReactDOM.render(bar,document.querySelector('#root'),function(){
    // 这个函数会等到虚拟的dom真正挂载到页面之后才会执行
    console.log(100)
});
// ReactDOM.render(<div>123</div>,document.querySelector('#root1'));


// let a = document.getElementById('ss');
// console.log(a) // 可以获取到真实的dom元素