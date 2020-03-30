// import：导入
// import { firstName as haha, lastName, year,ss,c } from './profile.js';
// import后面必须是一个大括号，大括号里面包含了导入的名字，这个名字必须和你导出接口的变量名保持一致
// 也可以通过as改名
// import中输入的变量是只读的
// from：后面跟的是路径

// firstName = 'hahah' // 这还少不被允许的
// c.name = 11 // 如果c是一个对象，那他的属性值是可以被修改的(这个事允许的)

// console.log(haha)

// import './profile.js'; // 仅仅是让这个文件运行一次
// import './profile.js';


//--------------------------------
// export function foo() { }

// import { foo } from './b.js'

//--------------------------------
// export default function () {
//     console.log('foo');
// }

// import a from './b.js';
// a()


//---------------------------------------
// export const A = 1;
// export const B = 3;
// export const C = 4;


// import * as constants from './b.js';

// constants.A
// constants.B


