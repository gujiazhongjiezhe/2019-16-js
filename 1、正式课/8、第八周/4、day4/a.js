console.log(188);
function toArray(){
    console.log(666)
}
function ss(){

}

module.exports = {
    toArray, // 把a模块中的toArray方法导出
    ss
}
// module.exports.ss =  toArray
// exports.ss =  toArray
// exports = {ss:toArray} // 不能这么重
