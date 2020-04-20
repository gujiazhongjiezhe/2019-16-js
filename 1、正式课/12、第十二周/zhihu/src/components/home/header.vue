<template>
    <div class="header">
        <van-icon name="tv-o" size="8vw"/>
        <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            input-align="center"
          
        />
        <van-icon name="calender-o" size="8vw"/>
    </div>
</template>

<script>

export default {
    props: {

    },
    data() {
        return {
            value:''
        };
    },
};
</script>

<style scoped lang="less">
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:2vw;
    }
</style>
