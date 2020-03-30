// common.js规范  require  module.expotrs  AMD  CMD  ES6的模块操作规范
// 模块
// a.js
// b.js
// export: 用于该模块想其他模块导出的接口
// import：用于接收其他模块导入的值

// export var a = 12;
// export var b = 13;


//-------------------------------------
// var a = 12;
// var b = 13;

// export {a,b}
//-------------------------------------------
// as可以进行重新命名
// var a = 12;
// var b = 13;
// var c = {name:1}
// export {a as ss,b as bb,c}

//------------------------------
// 这是错误的写法
// export 1
// var b = 12;
// export b
