<template>
    <div class="mainPage">
        <div>
            <router-view></router-view>
        </div>
        <nav class="navBox">
            <div>
                <router-link to="/home">
                    <i class="iconfont icon-11"></i>
                    <div>首页</div>
                </router-link>
            </div>
              <div>
                <router-link to="/vip">
                    <i class="iconfont icon-huiyuan-"></i>
                    <div>会员</div>
                </router-link>
            </div>
             <div>
                    <i class="iconfont plus icon-yingyong-"></i>
            </div>
              <div>
                <router-link to="/notify">
                    <i class="iconfont icon-tongzhi"></i>
                    <div>通知</div>
                </router-link>
            </div>
              <div>
                <router-link to="/user">
                    <i class="iconfont icon-icon-user"></i>
                    <div>会员</div>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
};
</script>

<style scoped lang="less">
    nav {
        position: fixed;
        bottom:0;
        left:0;
        width: 100%;
        height: 10vh; // 10vw
        border-top:1px solid #eee;
        display: flex;
        align-items: center;
        div {
            flex:1
        }
        a {
            text-decoration: none;
            color:#333;
            display: block;
            width: 100%;
            height: 100%;
            i {
                font-size: 5vw;
                font-weight: 800;
            }
        }
        i.plus {
            font-size:10vw
        }
        // 当前页面的hash值如果和router-link的标签的to属性值一样，那当前的router-link就会被加上router-link-active类名
        a.router-link-active {
            color:orangered
        }
    }
</style>
