// dispatch-->actions-->mutations-->state

export function changeHotList(state,option){
    // 如果上一次请求的type和这一次是一样的，说明你在请求下一页的数据，那就把新的数据拼接到老数据之后
    if(option.newType === option.oldType){
        state.hotList = state.hotList.concat(option.data) 
    }
    else {
        // 如果走else，说明你是切换的tab发送的请求，那就用新数据把来数据覆盖
        state.hotList = option.data
    }
    
}