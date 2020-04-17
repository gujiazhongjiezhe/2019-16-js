<template>
  <el-aside width="200px" style="background:#545c64">
    <div class="asideBox">
      <el-menu
        
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu v-for="(item,index) in menuList" :key="index" :index="index+ ''">
            <template slot="title">
              <i :class="item[0].meta.icon"></i>
              <span>{{item[0].meta.rootTil}}</span>
            </template>
            <router-link v-for="(a,b) in item" :key="b" :to="a.meta.my_Router">
              <el-menu-item >{{a.meta.til}}</el-menu-item>
            </router-link>
              
        </el-submenu>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
    // meta:{
    //         type:'job',
    //         rootTil:'职务管理',
    //         til:'新增职务',
    //         icon:'el-icon-s-check',
    //         power: 'jobhandle',
    //         my_Router:'/org/addJob'
    //     }

    // [{},{},{},{},{},{}]

    // 当打开组织结构的时候，传递来的数组有6项，但是咱们得给这个数组进行包装
    //  [[{},{}],[{},{}],[{},{}]]
  props: {
    ary:Array
  },
  mounted(){
    console.log(this.ary)
  },
  created(){
    this.init();
    console.log(this.menuList)
  },
 
  data() {
    return {
      menuList:[]
       //  [[{},{}],[{},{}],[{},{}]]
    };
  },
   methods:{
    init(){
      let power = localStorage.getItem('power'); // 'departhandle|allcustomer'
      let filterAry = this.ary.filter(item=>{
          return  power.includes(item.meta.power) 
      })
      // [{meta:{type:'job'}},{{meta:{type:'job'}},{type:'user'},{type:'user'},{'department'},{'department'}]
      let newAry = [this.ary[0]]
      // 最终menuList会生成三个数组，每一个数组对应一个模块
      filterAry.reduce((prev,next)=>{
        // 当第一次循环的时候，如果reduce没有传递第二个参数，那prev就是数组的第一项，如果传递第二个参数了，那prev就是传递的那个值

        // 以后当前次循环return的值会作为下一次的prev的值


        // 第一次循环：第一项  第二项
        // 第二次循环：第二项  第三项
        // 第三次循环：第三项  第四项
        // 第四次循环：第四项  第五项
        // 第五次循环：第五项  第六项
        if(prev.meta.type === next.meta.type){
            newAry.push(next)
        }
        else {
          this.menuList.push(newAry);
          newAry = [next]
        }
        return next // 当前return的值会作为下一次的prev的值
      });
      //当循环最后一次的时候，5、6项已经放到newAry中了，但是并没有把newAry放到menuList中
      this.menuList.push(newAry)
      
    }
  }
};
</script>

<style scoped lang="less">
.asideBox {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}
</style>
