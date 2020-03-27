let sum = (...arg)=>{
    // 求和
    return eval(arg.join('+')) // '1+2+3+4+5'
}

// console.log(sum(1,2,3,4,5))

module.exports = {
    sum
}