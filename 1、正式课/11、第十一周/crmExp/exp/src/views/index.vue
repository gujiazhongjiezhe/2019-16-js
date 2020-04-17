<template>
  <div>
    <el-container>
      <el-header class="clear">
          <h2 class="lt">CRM客户管理系统</h2>
          <div class="nav lt clear">
              <div class="organize lt">
                  <router-link to="/org" tag="span">组织结构</router-link>
              </div>
              <div class="customer lt">
                  <router-link to="/cus" tag="span">客户管理</router-link>
              </div>
          </div>
          <div class="userBox rt">
              <span>您好，板牙拖车</span>
              <span @click="signout">安全退出</span>
          </div>
      </el-header>
      <!-- <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container> -->

      <div class="middleBox">
          <router-view></router-view>
      </div>
    </el-container>
  </div>
</template>

<script>
import {signout,judeLogin} from '@/api/index.js'
export default {
  props: {},
  data() {
    return {};
  },
  created(){
      // 当用户进入首页的时候发送请求当前用户是否是登录状态，如果不是登录状态，就让其页面跳转到登录页
        judeLogin().then(data=>{
            if(data.code != 0){
                this.$router.push('/login')
            }
        })
  },
  methods:{
      signout(){
          // 发送请求退出的接口
          signout().then(data=>{
              if(data.code == 0){
                  this.$router.push('/login')
              }
          })
      }
  }
};
</script>

<style scoped lang="less">
// * {
//     padding:0;
//     margin:0;
//     list-style: none;
// }

// .lt {
//     float:left
// }
// .rt {
//     float:right
// }

.userBox {
    color: #fff;
    font-weight: 500;
    span:nth-child(2) {
        cursor: pointer;
        padding-left: 20px;

    }
}
.middleBox {
    position: absolute;
    width: 100%;
    left: 0;
    right:0;
    top:60px;
    bottom:0;
    .el-container {
    height: 100%;
    }
}



.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.nav {
    padding: 0 60px;
    div {
        margin: 0 20px;
        color:#eee;
        cursor: pointer;
        box-sizing: border-box;
        a {
            color:white
        }
        &:hover {
            color:#fff;
            &::after {
                content:'';
                display: block;
                width: 100%;
                position: relative;
                border-bottom:3px solid red;
                top:-5px
            }
        }
        // 如果电机的标签是router-link时，会默认给当前点击的标签加上router-link-active类名
        span.router-link-active {
            font-size: 20px;
            font-weight: 700;
            color:springgreen
        }
    }
}

// .el-aside {
//   background-color: #d3dce6;
//   color: #333;
//   text-align: center;
//   line-height: 200px;
// }

// .el-main {
//   background-color: #e9eef3;
//   color: #333;
//   text-align: center;
//   line-height: 160px;
//   height: calc(100vh - 60px);
// }
</style>
