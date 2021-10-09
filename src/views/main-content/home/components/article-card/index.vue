<template>
  <div class="pt-4 pb-2 mx-4 border-b border-gray-100">
    <!-- 简略信息 -->
    <div class="flex items-center text-[13px] text-gray-400">
      <div class="pr-3 text-gray-600 border-r border-gray-200">
        {{ article.authorName }}
      </div>
      <div class="px-3 border-r border-gray-200">
        {{ formatDateToText(article.publishTime) }}
      </div>
      <div class="pl-3">{{ article.type }}</div>
    </div>

    <div class="flex">
      <div class="flex-1 mt-2 mr-9 w-[calc(100%-164px)]">
        <!-- 文章标题 -->
        <div class="mb-2 text-base font-semibold text-gray-800">
          {{ article.title }}
        </div>
        <!-- 文章简介 -->
        <div
          class="mb-2 text-[13px] w-full text-gray-400 text-ellipsis"
          v-html="article.introduce"
        ></div>
        <!-- 访问量 -->
        <!-- <div class="flex items-center">
          <div class="text-[13px] mr-3 text-gray-600">
            <i class="text-sm iconfont icon-view-count"></i>
            <span class="ml-1">{{ article.viewCount }}</span>
          </div>
        </div> -->
      </div>
      <!-- 文章配图 -->
      <img
        class="box-border w-32 h-20 border border-gray-200 rounded"
        v-if="article.introduceImg"
        :src="article.introduceImg"
      />
    </div>
  </div>
</template>

<!-- 文章card -->
<script lang="ts" setup>
import { IArticle } from "../../interface";
import { formatDateToText } from "@/common/js/util";

defineProps<{
  article: IArticle;
}>();
</script>

<style lang="scss" scoped></style>
