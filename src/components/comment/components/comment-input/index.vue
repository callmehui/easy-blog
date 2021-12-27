<template>
  <div id="comment-input">
    <el-input
      v-model="modelValue"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 6 }"
      :input-style="{ padding: '8px 12px 8px 12px', height: '64px' }"
      :placeholder="`输入评论（Enter换行，${keyboardDesc}发送）`"
      @focus="handleFocus"
      @keydown.ctrl.enter.native="handleSubmit"
      @keydown.meta.enter.native="handleSubmit"
    />
    <div v-show="displayOperate" class="flex mt-2">
      <!-- 表情和图片 -->
      <div></div>
      <!-- 评论按钮 -->
      <div class="flex-initial flex-shrink-0 ml-auto">
        <span class="mr-4 text-sm text-gray-400">{{ keyboardDesc }}</span>
        <el-button
          type="primary"
          size="medium"
          :disabled="!modelValue"
          @click="handleSubmit"
          @keydown.ctrl.enter.native="handleSubmit"
          @keydown.meta.enter.native="handleSubmit"
          >发表评论</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentOS } from "@/common/js/util";
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "submit"): void;
}>();

/** 输入框是否聚焦 */
const isFocus = ref(false);
const isMacOS = ref(false);

const keyboardDesc = computed(() => {
  if (isMacOS.value) {
    return "⌘ + Enter";
  }
  return "Ctrl + Enter";
});

/** 是否展示操作按钮 */
const displayOperate = computed(() => {
  return props.modelValue.length > 0 || isFocus.value;
});

const handleFocus = () => {
  isFocus.value = true;
};

const handleInputClick = (e: Event) => {
  const commentInputEle = document.querySelector("#comment-input");
  /** 被点击的元素不是commentInputEle，就隐藏commentInputEle */
  if (!commentInputEle?.contains(e.target as Node | null)) {
    isFocus.value = false;
  }
};

const handleSubmit = () => {
  console.log("submit");
  emits("submit");
};

onMounted(() => {
  const { isMac } = getCurrentOS();
  isMacOS.value = isMac;
  document.addEventListener("click", handleInputClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleInputClick);
});
</script>

<style lang="scss" scoped></style>
