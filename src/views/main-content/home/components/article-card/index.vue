<template>
  <div class="py-4 mx-4 border-b border-gray-100">
    <!-- 简略信息 -->
    <div class="flex items-center text-gray-300">
      <div class="pr-1 text-gray-500 border-r border-gray-100">
        {{ article.authorName }}
      </div>
      <div class="px-1 border border-r border-gray-100">
        {{ formatDateToText(article.publishTime) }}
      </div>
      <div>{{ article.type }}</div>
    </div>

    <div class="flex">
      <div class="flex-1 mr-9">
        <!-- 文章标题 -->
        <div class="mb-4 text-lg font-medium text-gray-800">
          {{ article.title }}
        </div>
        <!-- 文章简介 -->
        <div class="mb-4 text-gray-400" v-html="article.introduce"></div>
        <!-- 访问量 -->
      </div>
      <!-- 文章配图 -->
      <img
        class="w-[120px] h-20 rounded border border-gray-200 box-border"
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
