<template>
  <div id="app-content" class="flex flex-col">
    <Header />
    <el-scrollbar class="h-[calc(100vh-60px)] flex-1 mt-[60px] bg-gray-100">
      <router-view />
    </el-scrollbar>
    <!--  vue-query 开发者工具 -->
    <VueQueryDevTools />
  </div>
</template>

<script lang="ts" setup>
import { VueQueryDevTools } from "vue-query/devtools";
import { QueryClient, useQueryProvider } from "vue-query";
import Header from "./views/header/index.vue";

/** 初始化queryClient缓存实例，后续页面可以通过useQueryClient()获取该缓存实例 */
useQueryProvider(new QueryClient());
</script>

<style lang="scss" scoped>
#app-content {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;

  :deep(.el-scrollbar__view) {
    display: flex;
    justify-content: center;
    height: 100%;
  }
}
</style>
