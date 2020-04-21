import React from 'react';
import ReactDOM from 'react-dom';
import './4.index.css';

let obj = {
    name: '陈涛'
};
function fn(){
    console.log(1);
    return {}
}
let sss = {
    color:'red',
    fontSize:'50px'
}


let a = <div>{obj.name}</div>
let b = <div>{3 > 1 ? '板牙' : '拖车'}</div>
let c = <div>{100 + 200}</div>

let d = <div>
    <div>{null}</div>
    <div>{undefined}</div>
    <div>{true}</div>
    <div>{false}</div>
    {/* <div>{NaN}</div> */}
    {/* <div>{obj}</div> */}
    {/* <div>{fn}</div> */}
    {/* <div>{fn()}</div> */}
    <div>{[<span>2</span>,<span>3</span>]}</div>
    <div className="box"  style={sss}>11111</div>
    <label></label>
</div>

ReactDOM.render(d, document.querySelector('#root'));
// 1、在jsx中的元素中如果想获取变量，用大括号进行包裹，
// 2、而且支持元素运算符和表达式
// 3、如果早大括号中放null undefined true false都不显示
// 4、函数和对象的空间地址不能够直接作为react的子元素,不能放在{}中，三十可以把函数的执行结果放到{}中，
// 5、函数的执行结果不能是一个对象的空间地址
// 6、大括号中可以直接放数组，而且数组中可以放react元素，而且最后会一起被渲染到页面
// 7、行间属性不能使用class关键字，用className；不能在label标签中使用for--》htmlFor
// 8、在jsx语法中，行间属性的style样式需要那{{}}包裹,恩爱层的对象就是识别变量的大对象，里边的对象就是一个普通的对象，而且样式的属性名要使用驼峰命名法