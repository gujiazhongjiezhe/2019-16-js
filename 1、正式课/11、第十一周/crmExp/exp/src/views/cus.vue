<template>
  <div>
    <!-- <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
    </el-container>-->
    <el-container>
        <my-aside :ary="ary"></my-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import nav from "@/components/nav.vue";
import ary from '@/router/customer.js';
export default {
  props: {},
  data() {
    return {
      ary:ary
    };
  },
  components: {
    "my-aside": nav
  }
};
</script>

<style scoped lang="less">
</style>
