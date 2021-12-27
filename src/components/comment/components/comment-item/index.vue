<template>
  <div class="flex py-4">
    <!-- 头像 -->
    <img
      class="w-10 h-10 rounded-[20px] border border-gray-400"
      :src="comment.portrait"
      :alt="comment.nickname"
    />
    <div class="flex-1 ml-4">
      <!-- 评论内容 -->
      <div>
        <div class="flex items-center">
          <div class="text-[15px] text-gray-800 font-medium">
            {{ comment.nickname }}
          </div>
          <span class="ml-auto text-sm text-gray-400">{{
            formatDateToText(comment.publishTime, true)
          }}</span>
        </div>
        <div class="my-2 text-sm text-gray-500 break-all" v-html="comment.comment"></div>
      </div>
      <!-- 评论操作：点赞和回复 -->
      <!-- 二级评论 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDateToText } from "@/common/js/util";
import { ICommentItem } from "../../hooks/interface";

defineProps<{
  comment: ICommentItem;
}>();
</script>

<style lang="scss" scoped></style>
