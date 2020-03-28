// node就是一个环境，

// webpack编译打包工具，基于node运行
// npm 安装一些模块
// 全局 ：npm i xxx -g 任何一个项目都可以用
// 本地项目： 开发依赖  生产依赖
// 开发 npm i xxx --save-dev
// 生产依赖 npm i xxx

// npm 如果npm官网上没有，那你就不能下载 


// 为js在后台运行提供环境，基于node构建中小型项目

// 单线程异步  非阻塞I/O  事件驱动

// readFileSync()
// console.log(100)

// 模块管理规范
// AMD：requre.js
// CMD:sea.js
// Common.js:node.js

// 每一个js文件就是一个模块
// 自定义模块(自己写的js文件)  内置模块(node自带的) 第三方模块(npm下载的)


// 导入导出的特点
// 可以省略.js后缀名
// 如果是自定义模块，那路径必须是相对路径
// 不加地址，先找第三方模块，再找核心模块，如果还找不到就报错了

// let obj = {
//     fn:function(){}
// } // 空间地址
// module.exports = obj // 空间地址

// // let a = require('./a.js');
// // a.fn()

// let {fn} = require('./a.js');
// fn()

let fs = require('fs');
// let {readFile} = require('fs');

// readdir:读取指定的文件目录
// fs.readdir('./','utf8',function(err,data){
//     console.log(err)
//         console.log(data)
// })

// 如果你读取的文件是图片，音频，视频是不需要转换为utf8的
// 默认请求来的是Buffer格式的文件流

// readFile(pathname,encoding,function(err,data){})
// wirteFile(pathname,content,encoding,function(err,data){}) // 覆盖之前的内容
// appendFile(pathname,content,encoding,function(err,data){}) // 追加内容
// copyFile(pathname1,pathname2,function(err,data){})
// mkdir(pathname,function(err,data){})
// rmdir(pathname,function(err,data){})
// ukLink(pathname,function(err,data){})

// fs.readdir('./','utf8',function(err,data){
//     console.log(err)
//         console.log(data)
// })


let { readFile,mkdir,writeFile,copyFile} = require('./promiseFs');

// readFile('./test.txt').then(function (data) {
//     console.log(data)
// }).catch(function (data) {
//     console.log(data)
// })

// mkdir('./ss').then(function(data){})

fs.writeFile('./test.txt',{},function(){})
// 对象不能直接存储，要用JSON.stringify转一下
// 如果传递的是其他类型的话，直接转为字符串 true +''

writeFile('./test.txt',[1,2,3,4]).then(function(data){

})

// copyFile('./r.txt','./test.txt').then(function(data){
//     console.log(data)

// })

// 相对路径和绝对路径
// fs.readdir('',function(err,data){
//     console.log(data)
// })










