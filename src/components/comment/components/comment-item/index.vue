<template>
  <div class="flex" :class="[isChildren ? 'py-0 pt-6' : 'py-4']">
    <!-- 头像 -->
    <img
      class="w-10 h-10 rounded-[20px] border border-gray-400"
      :class="[isChildren ? 'w-6 h-6' : 'w-10 h-10']"
      :src="comment.portrait"
      :alt="comment.nickname"
    />
    <div class="flex-1 ml-4">
      <!-- 评论内容 -->
      <div>
        <div class="flex items-center">
          <div class="flex items-center">
            <div class="text-[15px] text-gray-800 font-medium">
              {{ comment.nickname }}
            </div>
            <!-- 存在父级评论时 -->
            <div v-if="parentComment" class="flex items-center">
              <span class="px-3 text-normal">回复</span>
              <div class="text-[15px] text-gray-800 font-medium">
                {{ parentComment.nickname }}
              </div>
            </div>
          </div>
          <span class="ml-auto text-sm text-gray-400">{{
            formatDateToText(comment.publishTime, true)
          }}</span>
        </div>
        <div class="my-2 text-sm text-gray-700 break-all" v-html="comment.comment"></div>
        <div
          v-if="parentComment"
          class="mt-2 mb-3 px-3 py-1 bg-gray-100 border-gray-200 border rounded"
        >
          <div
            class="text-sm text-gray-500 break-all"
            v-html="`“${parentComment.comment}”`"
          ></div>
        </div>
      </div>
      <!-- 评论操作：点赞和回复 -->
      <div class="flex items-center">
        <div
          class="flex items-center text-sm cursor-pointer text-[#8a919f] mr-4 hover:text-blue-500"
          :class="[hasLiked ? 'text-active' : 'text-normal']"
          @click="handleAddLike"
        >
          <Icon
            :icon="hasLiked ? 'zan-solid' : 'zan'"
            :size="16"
            bg-color="none"
            :scale="1"
            color="inherit"
          />
          <span class="ml-1">{{
            commentLikeList.length > 0 ? commentLikeList.length : "点赞"
          }}</span>
        </div>

        <div
          class="flex items-center text-sm cursor-pointer text-[#8a919f] hover:text-blue-500"
          :class="[state.toogleCommentBtn ? 'text-active' : 'text-normal']"
          @click="handleToggleCommentBtn"
        >
          <Icon
            :icon="state.toogleCommentBtn ? 'comment-solid' : 'comment'"
            :size="16"
            bg-color="none"
            :scale="1"
            color="inherit"
          />
          <span class="ml-1">{{ state.toogleCommentBtn ? "取消回复" : "回复" }}</span>
        </div>
      </div>
      <CommentInput
        v-show="state.toogleCommentBtn"
        class="mt-3"
        :class="[isChildren ? 'mb-0' : 'mb-6']"
        v-model="state.commentValue"
        :focus="true"
        :placeholder="`回复 ${comment.nickname}...`"
        @submit="handleSubmitComment"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from "vue";
import debounce from "lodash/debounce";
import { formatDateToText } from "@/common/js/util";
import { ICommentItem } from "../../hooks/interface";
import { useStore } from "@/store";
import { toogleCommentLike } from "../../hooks/useComments";
import Icon from "@/components/Icon/index.vue";
import CommentInput from "../comment-input/index.vue";

const props = withDefaults(
  defineProps<{
    isChildren?: boolean;
    comment: ICommentItem;
    parentComment?: ICommentItem;
  }>(),
  {
    isChildren: false,
  }
);

const emits = defineEmits<{
  (e: "updateComment", comment: ICommentItem): void;
  (e: "re-fetch-comment"): void;
  (e: "show-dialog"): void;
  (e: "submit", comment: string, beCommentId: number): void;
}>();

const { comment, isChildren, parentComment } = toRefs(props);

const store = useStore();

/** 评论id */
const commentId = computed(() => comment.value.id);
/** 访客信息 */
const visitor = computed(() => store.state.visitor.visitor);
/** 访客id */
const visitorId = computed(() => visitor.value.id);

/** 评论点赞列表 */
const commentLikeList = computed(() =>
  comment.value.likeList.filter((item) => item.visitorId)
);

/** 当前评论是否被当前用户点赞过 */
const hasLiked = computed(() => {
  const { id } = visitor.value;
  if (!id) {
    return false;
  }
  return commentLikeList.value.map((item) => item.visitorId).includes(Number(id));
});

const state = reactive({
  toogleCommentBtn: false,
  commentValue: "",
});

const handleAddLike = () => {
  if (visitorId.value) {
    return debounce(async () => {
      const isSuccess = await toogleCommentLike(
        commentId.value,
        visitorId.value as number,
        !hasLiked.value
      );
      if (isSuccess) {
        emits("re-fetch-comment");
      }
    }, 500);
  } else {
    emits("show-dialog");
  }
};

const handleToggleCommentBtn = () => {
  if (visitorId.value) {
    state.toogleCommentBtn = !state.toogleCommentBtn;
  } else {
    emits("show-dialog");
  }
};

const handleSubmitComment = () => {
  const commentStr = state.commentValue;
  state.toogleCommentBtn = false;
  state.commentValue = "";
  emits("submit", commentStr, comment.value.id);
};
</script>

<style lang="scss" scoped>
.text-normal {
  color: #8a919f;
}
.text-active {
  color: #3b82f6;
}
</style>
