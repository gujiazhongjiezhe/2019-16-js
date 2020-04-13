// const greeter = require('./greeter.js');
// // import './a.js';
// document.querySelector("#root").appendChild(greeter());

import './index.css' // 这样写只会让index.css执行一遍
// import './index.less';
let a = 100;
let fn = ()=>{
    console.log(a)
}
fn()