<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
    padding:0;
    margin:0;
    list-style: none;
}
.lt {
    float:left
}
.rt {
    float:right
}
.clear::after {
  content: '';
  display: block;
  clear:both;
}
.el-container {
 height: calc(100vh - 60px)
}
</style>
