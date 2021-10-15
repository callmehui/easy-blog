<template>
  <div class="w-full bg-gray-100">
    <div class="max-w-5xl m-auto">
      <div class="grid grid-cols-12 mt-4 mb-8">
        <div class="lg:col-span-9 md:col-span-12">
          <div
            class="flex px-4 py-3 mb-5 bg-white border border-gray-200 rounded shadow "
            v-for="tool in tools"
            :key="tool.name"
          >
            <div class="mr-4 bg-gray-900 border border-gray-100 rounded-lg">
              <img
                class="h-full px-2 pt-4 pb-2 w-80"
                :src="tool.coverUrl"
                alt="工具预览图片"
              />
            </div>
            <div class="flex-1">
              <a
                class="block mb-2 text-lg font-bold text-gray-700"
                :href="tool.previewUrl"
                target="_blank"
              >
                {{ tool.name }}
              </a>
              <a
                class="block mb-2 text-sm text-gray-500 text-ellipsis-3"
                :href="tool.previewUrl"
                target="_blank"
              >
                {{ tool.summary }}
              </a>
              <div class="mb-4">
                <span class="text-sm text-gray-500">是否可用：</span>
                <span class="text-sm text-blue-600">{{ tool.type }}</span>
              </div>
              <div class="pb-2">
                <router-link class="mr-4 btn btn-primary" :to="tool.previewUrl">打开使用</router-link>
              </div>
              <div class="text-xs text-gray-400 text-ellipsis">
                {{ tool.remark }}
              </div>
            </div>
          </div>
        </div>
        <!-- 个人信息 -->
        <div class="right-0 col-span-3 ml-5 rounded">
          <div class="fixed w-[236px]">
            <Author />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 工具 -->
<script lang="ts" setup>
import Author from "../home/components/author/index.vue";
import Footer from "../home/components/footer/index.vue";

const tools = [
  {
    name: "文章封面生成器",
    type: "可用",
    summary:
      "用于生成文章的配图，基本模板目前只有一个，可以切换封面的配图和文字。",
    coverUrl:
      "https://image.immortalboy.cn/public/uploads/2021/10/10/1633864480549826.png",
    previewUrl: "/cover-designer",
    remark: "目前只有一个模板，有好的UI会再增加模板",
  },
];
</script>

<style lang="scss" scoped></style>
