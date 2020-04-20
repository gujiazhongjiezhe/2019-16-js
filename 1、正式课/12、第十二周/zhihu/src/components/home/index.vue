<template>
  <div class="home">
    <Header></Header>
    <van-tabs v-model="active"  @change="change">
      <van-tab
        v-for="(item,index) in titleData"  
        :key="index"    
        :title="item.title">
        <router-view></router-view>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Header from "./header.vue";
export default {
  props: {},
  created(){
    //   this.change(0)
  },
  data() {
    return {
        active:0,
        titleData:[
            {
                title:'关注',
                to:'/home/focus',
            },
            {
                title:'推荐',
                to:'/home/recommend',
            },
            {
                title:'热榜',
                to:'/home/hot',
            }
        ]
    };
  },
  methods:{
      change(index){ // index会默认接受当前点击tab的索引
          console.log(index)
       this.$router.push(this.titleData[index].to)
      }
  },
  components: {
    Header
  }
};
</script>

<style  lang="less">
.van-tabs__line {
    background-color:orchid !important;
}
</style>
