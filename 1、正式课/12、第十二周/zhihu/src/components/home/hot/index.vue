<template>
  <div class="hot">
    <van-tabs type="card" v-model="index" @change="getList">
      <van-tab v-for="item in tabList" :title="item.title" :key="item.type">
            <Item 
                v-for="(a,b) in hotList" 
                :key="b" 
                :data="a"
                :index="b"
                >
            </Item>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Item from "./item.vue";
import {mapState} from 'vuex';
export default {
  props: {},
  data() {
    return {
      tabList: [
        {
          title: "推荐",
          type: "tuijian"
        },
        {
          title: "科技",
          type: "keji"
        },
        {
          title: "教育",
          type: "jiaoyu"
        },
        {
          title: "娱乐",
          type: "yule"
        },
        {
          title: "汽车",
          type: "qiche"
        },
        {
          title: "金融",
          type: "jinrong"
        },
        {
          title: "体育",
          type: "tiyu"
        }
      ],
      index: "0",
      oldType: "",
      flag: true
    };
  },
  created() {
   this.getList();
   window.onscroll = () =>{
       if(!this.flag){
           return
       }
       this.getMore()
   }
  },
  computed: {
    // hotList(){
    //     return this.$store.state.hotList
    // }
    ...mapState(['hotList'])
  },
  methods: {
    getList() {
      this.$store.dispatch("getHotList", {
        newType: this.tabList[this.index].type, // 当前请求的type类型
        oldType: this.oldType, // 上一次请求的type类型
        count: 10, // 每次请求数据的条数
        reload: true,
        cur_step: 0,
        category: this.tabList[this.index].type
      }).then(data=>{
          this.flag = true;
      });
      this.oldType = this.tabList[this.index].type; // 把当前最新的type赋值给oldType
    },
    getMore(){
        // 获取下一页的10条数据
        let add = document.getElementById('#app');
        let winH = document.documentElement.clientHeight;
        let scroT = document.documentElement.scrollTop;
        if(winH+scroT+50>app.offsetHeight){
            this.flag = false;
            this.getList()
        }
    }
  },
  components: {
    Item
  }
};
</script>

<style  lang="less">
.hot {
  padding: 2vh;
}
.van-tabs__nav--card {
  border: none !important;
}
.van-tabs__nav--card .van-tab {
  border: none;
  color: #646464;
  background-color: #f6f6f6;
  margin: 0 1vw;
}

.van-tabs__nav--card .van-tab.van-tab--active {
  background-color: rgb(218, 249, 250);
  color: rgb(38, 167, 226);
  font-weight: 600;
}
</style>
