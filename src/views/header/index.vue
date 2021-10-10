<template>
  <div class="w-full h-[60px] bg-white shadow fixed z-[2000]">
    <div class="flex items-center h-full max-w-6xl m-auto">
      <!-- logo -->
      <router-link class="flex items-center mr-5" to="/">
        <img class="w-8 h-8" src="@/common/image/avatar.png" alt="logo" />
        <span class="ml-1 text-2xl text-gray-700">{{ state.logoName }}</span>
      </router-link>
      <!-- nav -->
      <nav>
        <ul class="flex items-center h-full">
          <router-link
            class="px-5 text-base font-medium text-gray-400 cursor-pointer  hover:text-blue-500"
            :class="{ 'text-blue-500': nav.active }"
            v-for="nav in state.navs"
            :key="nav.text"
            :to="nav.url"
          >
            {{ nav.text }}
          </router-link>
        </ul>
      </nav>
    </div>
  </div>
</template>

<!-- 头部导航 -->
<script lang="ts" setup>
import { watch, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const state = reactive({
  logoName: "Marktwain",
  navs: [
    { text: "首页", url: "/", active: true },
    { text: "作品集", url: "/production", active: false },
    { text: "关于我", url: "/about", active: false },
    { text: "简历", url: "/resume", active: false },
  ],
});

watch(
  () => route.path,
  (path) => {
    state.navs = state.navs.map((item) => ({
      ...item,
      active: item.url === path,
    }));
  }
);
</script>

<style lang="scss" scoped></style>
