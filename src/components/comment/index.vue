<template>
  <div class="px-8 pb-6 mt-4 bg-white">
    <!-- 发表评论 -->
    <div class="pt-6">
      <!-- 标题 -->
      <div class="text-lg text-gray-800 font-semibold mb-6">评论</div>
      <!-- 发表评论输入框 -->
      <div class="flex">
        <Icon
          icon="user-avatar"
          :size="40"
          bgColor="#c8c8c8"
          color="#fff"
          :scale="0.6"
        />
        <CommentInput class="flex-1 ml-4" v-model="commentValue" />
      </div>
    </div>
    <div></div>
    <!-- 热门评论 -->
    <!-- 全部评论 -->
    <div class="pt-8" v-if="comments && comments.length > 0">
      <div class="text-lg text-gray-800 font-semibold py-2">全部评论</div>
      <div>
        <CommentItem
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { CommentType } from "./interface";
import CommentInput from "./components/comment-input/index.vue";
import CommentItem from "./components/comment-item/index.vue";
import Icon from "../Icon/index.vue";
import { useComments } from "./hooks/useComments";

const props = withDefaults(
  defineProps<{
    id: number;
    type?: CommentType;
  }>(),
  {
    type: "article",
  }
);

const { id, type } = toRefs(props);

const commentValue = ref<string>("");

const { data: comments } = useComments(id, type);
</script>

<style lang="scss" scoped></style>
