// node中的模块：内置模块  第三方模块  自定义模块

// fs：文件操作系统
let fs = require('fs');

// 1、fs.readdir : 异步读取指定的文件目录，返回值是一个数组，数组里面包含了目录(字符串类型)
        // fs.readdir('./',function(err,res){
        //     // 如果路径是正确的，那res就是一个数组，如果不正确，那res就是undefined
        //     // 如果路径是错误的那err就是一些错误信息，如果路径是正确的，那err就是null
        //     console.log(res)
        //     console.log(err)
        // });

        // console.log(100)

// 2、fs.readdirSync：同步的读取文件目录
        //  let res = fs.readdirSync('./');
        //  console.log(res)
        //  console.log(100)


// 3、readFileSync：同步读取文件
    // node默认读取的是Buffer格式的文件流，0-9a-f，每一个汉字或者字母都有其对应的固定的BUffer数据
    // readFileSync(path,encoding);默认得到的是Buffer文件流的编码，用utf-8转一下得到html，json；但是对于图片，音频，视频我们读取和传输的过都是Buffer格式的数据流，所以不需要设置成utf8
    // let res = fs.readFileSync('./2、npm.html','utf8');
    // console.log(res)

    // let res = fs.readFileSync('./2、npm.html');
    // console.log(res.toString()) // 把Buffer格式还在转化为utf8格式
    // Buffer.from:把utf8格式转化为BUffer格式
    // console.log(Buffer.from(res.toString()))

//4、readFile：异步读取文件
    // readFileSync(path,encoding,回调函数);
    // fs.readFile('./rr.txt','utf8',function(err,res){
    //     console.log(res)
    // })

// 5、writeFile: 想某个文件中写入内容，把之前的进行覆盖
    // fs.writeFile('./rr.txt','你真的好坏啊','utf8',function(err,res){
    //         console.log(res)
    // })

// 6、writeFileSync 
    // fs.writeFileSync('./rr.txt','哈哈')


// 7、appendFileSync：同步追加内容
    // fs.appendFileSync('./rr.txt','123456')

// 8、appendFile：异步追加内容

// 9、copyFileSync：把文件拷贝一份，放到新的文件中,并且把之前的内容进行覆盖
    // fs.copyFileSync('rr.txt','ss.txt');

// 10、copyFile：异步拷贝


// 11、unLink:异步删除文件
    // fs.unlink('./rr.txt',function(){
    //     console.log(100)
    // })
    // console.log(200)



// 12、mkdir:创建文件夹
    // fs.mkdir('./js',function(){

    // })


// 13、rmdir:删除文件夹
    // fs.rmdir('./js',function(){

    // })






    