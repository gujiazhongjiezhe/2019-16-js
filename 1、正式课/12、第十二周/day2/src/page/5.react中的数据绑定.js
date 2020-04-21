import React from 'react';
import ReactDOM from 'react-dom';

let ary = [
    {
        name:'汪伟',
        age:18
    },
    {
        name:'潘虹',
        age:28
    }
]

let a = <ul>
    {/* {[<li>汪伟</li>,<li>潘虹</li>]} */}
    {ary.map((item,index)=>{
        return <li key={index}>
            <span>{item.name}</span>
            <span>{item.age}</span>
        </li>
    })}
</ul>
ReactDOM.render(a,document.querySelector('#root'))