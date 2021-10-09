<template>
  <div id="app-content" class="flex flex-col">
    <Header />
    <el-scrollbar class="h-[calc(100%-60px)] flex-1 mt-[60px]">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Header from "./views/header/index.vue";
</script>

<style lang="scss" scoped>
#app-content {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :deep(.el-scrollbar__view) {
    display: flex;
    justify-content: center;
    height: 100%;
  }
}
</style>
