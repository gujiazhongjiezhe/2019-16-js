<template>
    <div class="itemBox">
        <div class="num">{{index+1}}</div>
        <div class="content">
            <h4>{{data.title}}</h4>
            <p>{{data.author}}</p>
        </div>
        <div class="imgBox">
            <img :src="data.image_field ?data.image_field.url:defaultImg" alt="">
        </div>
    </div>
</template>

<script>
import img from '@/assets/logo.png'
export default {
    props: ['index','data'],
    data() {
        return {
            defaultImg:img
        };
    },
};
</script>

<style scoped lang="less">
    .itemBox {
        display: flex;
        border-bottom:1px solid #eee;
        padding:2vw 0;
        margin: auto;
        width: 90vw;
        .num {
            width: 10vw;
        }
        .content{
            width: 60vw;
            overflow-wrap: break-word;
        }
        .imgBox {
            width: 20vw;
            height: 18vw;
            border-radius: 5vw;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
