let {sum} = require('./a'); // 把a模块导出的东西在b模块里接收
// 结构赋值：左边右边结构一样 
let avg = (...arg)=>{
    let ary = arg.sort((a,b)=>a-b).slice(1,arg.length-1)
    return sum(...ary)/ary.length;
}

module.exports = {
    avg
}