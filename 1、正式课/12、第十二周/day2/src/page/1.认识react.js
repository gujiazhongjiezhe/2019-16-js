import React from 'react';
import ReactDOM from 'react-dom';

// React的核心库，每一个js都要导入react和react-dom
// 在js中你为什么可以写标签

// ReactDOM.render:就是将react元素挂载到页面的id名为root的元素中

 let a = <div>1111</div>; // 
 // 这叫jsx语法，在react中支持jsx语法，后缀名是jsx的文件,那么以后咱们就可以直接在这个文件中写标签了,这个标签就是一个react元素

 // 浏览器只支持html，css，js文件，不支持.jsx结尾的文件，因为在你打开浏览器的时候，你的jsx文件已经被babel编译过了，
 console.log(a,7) // 虚拟的DOM对象

 // 行内不能直接写class名
 let b = <div class="a">
     <ul>
         <li>1</li>
         <li>2</li>
     </ul>
 </div>
ReactDOM.render(b,document.querySelector('#root'));
// 1、react元素，将虚拟的dom转化成真实的dom
// 2、就是一个真实的DOM元素，把上班生成的真实的DOM元素挂载到根元素root元素里
// 3、第三个参数是一个函数


