<template>
  <div class="w-full bg-gray-100">
    <div class="max-w-5xl m-auto">
      <div class="grid grid-cols-12 mt-4 mb-8">
        <div class="lg:col-span-9 md:col-span-12">
          <div
            class="
              flex
              px-4
              py-3
              mb-5
              bg-white
              border border-gray-200
              rounded
              shadow
            "
            v-for="product in products"
            :key="product.name"
          >
            <div class="mr-4 bg-gray-900 border border-gray-100 rounded-lg">
              <img
                class="h-full px-2 pt-4 pb-2 w-80"
                :src="product.coverUrl"
                alt="项目预览图片"
              />
            </div>
            <div class="flex-1">
              <a
                class="block mb-2 text-lg font-bold text-gray-700"
                :href="product.previewUrl"
                target="_blank"
              >
                {{ product.name }}
              </a>
              <a
                class="block mb-2 text-sm text-gray-500 text-ellipsis-3"
                :href="product.previewUrl"
                target="_blank"
              >
                {{ product.summary }}
              </a>
              <div class="mb-4">
                <span class="text-sm text-gray-500">项目状态：</span>
                <span class="text-sm text-blue-600">{{ product.type }}</span>
              </div>
              <div class="pb-2">
                <a
                  class="mr-4 btn btn-primary"
                  :href="product.previewUrl"
                  target="_blank"
                  >在线预览</a
                >
                <a
                  v-if="product.githubUrl"
                  class="btn btn-secondary"
                  :href="product.githubUrl"
                  target="_blank"
                  >github</a
                >
              </div>
              <div class="text-xs text-gray-400 text-ellipsis">
                {{ product.remark }}
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

<script lang="ts" setup>
import Author from "../home/components/author/index.vue";
import Footer from "../home/components/footer/index.vue";

const products = [
  {
    name: "仿网易云音乐播放器",
    type: "开源项目",
    summary:
      "基于Vue3、Typescript和vite开发的仿网易云音乐客户端web版本。UI参照了网易云音乐mac客户端，后端接口由开源项目提供，高度还原了网易云音乐。项目仍在持续维护中...",
    coverUrl:
      "https://image.immortalboy.cn/public/uploads/2021/12/24/1640340786327969.jpg",
    githubUrl: "https://github.com/callmehui/web-music-player",
    previewUrl: "https://music-player.immortalboy.cn",
    remark: "项目前端通过netlify自动部署，国内访问相对慢。",
  },
  {
    name: "个人博客项目：easyblog第二版",
    type: "持续迭代中",
    summary:
      "个人博客的第二版，仍在持续迭代中。目前项目的仍使用旧版，计划后端重写，小程序重写，计划支持多人使用.开发完成后再开源。",
    coverUrl:
      "https://image.immortalboy.cn/public/uploads/2021/10/10/1633865388480575.png",
    githubUrl: "",
    previewUrl: "https://immortalboy.cn/",
    remark: "项目持续迭代中，同时个人博客积极更新中。",
  },
];
</script>

<style lang="scss" scoped></style>
