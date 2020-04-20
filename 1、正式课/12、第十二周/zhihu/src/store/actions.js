import {hotList} from '@/api/index.js'
export function getHotList({commit},option){
    return hotList(option).then(data=>{
        // dispatch:派发actions中的方法
        // actions中必须去commit mutations中的方法
        // mutations去更改state中的数据
        commit('changeHotList',{
            data:data.data,
            oldType:option.oldType,
            newType:option.newType
        })
    })
}