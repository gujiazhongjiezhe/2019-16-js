let fs = require('fs');
let path = require('path'); // 输出绝对路径
// console.log(path.resolve('./')); // c:\Users\1\Desktop\new
// ../
let obj = {};
// obj.readFile = function(){};
// obj.readdir = function(){};
// obj.writeFile = function(){};
// c:\Users\1\Desktop\new\test.txt

// 检测当前文件格式类型，并且返回对应的编码格式
function suffixName(pathanme) {
    let suffixReg = /\.([a-zA-z0-9]+)$/; // 匹配当前路径里的文件后缀(格式)
    let suffix = suffixReg.exec(pathanme) ? suffixReg.exec(pathanme)[1] : null; // 获取当前文件的格式内容
    let encoding = 'utf8';
    let picReg = /^(png|gif|jpg|webp|ico|mp4|mp3|svg)$/;
    picReg.test(suffix) ? encoding = null : null; // 如果文件格式是以上几个，那就把encoding改为null，
    return encoding;
}

['readFile', 'readdir', 'mkdir', 'rmdir', 'unLink'].forEach(item => {
    obj[item] = function (pathanme) {
        pathanme = path.resolve(pathanme) // 把相对路径转为绝对路径;
        return new Promise((resolve, reject) => {
            let encoding = suffixName(pathanme);
            let callBack = function (err, data) {
                // 如果函数执行正常，那err的值就是null，如果不正常，那err的值就是错误信息
                if (err !== null) {
                    reject(err);
                    return;
                }
                resolve(data);
            }
            if (item !== 'readFile') {
                encoding = callBack; // 把回到函数放到第二个参数的位置
                callBack = null; // 把第三个位置的值换位null
            }
            fs[item](pathanme, encoding, callBack); // 调用的原生方法
        });
    }
});
['writeFile', 'appendFile'].forEach((item) => {
    obj[item] = function (pathname, content) {
        pathname = path.resolve(pathname);
        // 对象不能直接存储，要用JSON.stringify转一下
        // 如果传递的是其他类型的话，直接转为字符串 true +''
        typeof content === 'object' && content !== null ? content = JSON.stringify(content) : null;
        typeof content !== 'string' ? content += '' : null;

        return new Promise((resolve, reject) => {
            let encoding = suffixName(pathname);
            let callBack = function (err, data) {
                // 如果函数执行正常，那err的值就是null，如果不正常，那err的值就是错误信息
                if (err !== null) {
                    reject(err);
                    return;
                }
                resolve(data);
            }
            fs[item](pathname, content, encoding, callBack)
        })

    }
});
obj['copyFile'] = function(pathanme1,pathanme2){
    pathanme1 = path.resolve(pathanme1);
    pathanme2 = path.resolve(pathanme2);
    return new Promise((resolve,reject)=>{
        fs['copyFile'](pathanme1,pathanme2,(err,data)=>{
            if(err !==null){
                reject(err);
                return;
            }
            resolve()
        })
    })

};
module.exports = obj;
