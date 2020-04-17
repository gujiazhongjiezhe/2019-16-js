<template>
    <div id="sss" class="eee">
        {{msg}}
        <button @click="add">我是板牙拖车</button>
        <exp></exp>
    </div>
    <!-- 这个结构最终会把index.html外层的id名为app的元素替换掉 -->
</template>

<script>
// 以后咱们把每一个组件放到.vue文件中,这个文件中包含HTML的结构、css以及这个组件对应的对象信息

// 利用第三方插件vue-loader把后缀名为.vue的文件编译成正常的js文件，供HTML来识别
import exp from './exp.vue';
    export default {
        data(){
            return  {
                msg:100
            }
        },
        methods:{
            add(){
                this.msg++
            }
        },
        components:{
            exp
        }
    }
</script>
<style>
    div {
        width: 100px;
        height: 100px;
        background: orangered;
    }
</style>

