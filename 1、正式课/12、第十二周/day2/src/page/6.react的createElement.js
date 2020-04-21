import React from 'react';
import ReactDOM from 'react-dom'

// let a = <div ss="11">
//     hello
// </div>
// 这是一个react元素，同时也叫jsx元素
// console.log(a)
// 当解析js的时候，回调用React.createElement会把当前的jsx的标签变成虚拟的dom，最后在把虚拟dom'变成真实dom挂载到页面
// console.log(React)

let a = React.createElement('div',{ss:'11'},'hello');
// React.createElement就是jsx的语法糖
console.log(a)

// let b = <div a="北京">
//     回龙观
//     <p>东大街
//        <span>11</span>
//     </p>
// </div>

let b = React.createElement(
    'div' ,
    {a:'北京'},
    '回龙观',
    React.createElement('p',null,'东大街', React.createElement('span',null,'111'))
    );


// createElement(type,props,text,children)
// type:标签类型  props:行间属性  text: 文本内容 children:是元素子节点

// 最终还是操作的是虚拟的dom，会进行DOM-diff对比
ReactDOM.render(b,document.querySelector('#root'))