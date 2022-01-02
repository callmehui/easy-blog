<template>
  <div ref="commentInputRef" @click="handleClick">
    <el-input
      :modelValue="modelValue"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 6 }"
      :input-style="{ padding: '8px 12px 8px 12px', height: '64px' }"
      :placeholder="placeholderText"
      :autofocus="focus"
      @focus="handleFocus"
      @keydown.ctrl.enter.native="handleSubmit"
      @keydown.meta.enter.native="handleSubmit"
      @input="handleInput"
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
import { computed, ref, onMounted, onBeforeUnmount, toRefs, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    focus?: boolean;
  }>(),
  {
    modelValue: "",
    placeholder: "",
    focus: false,
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
  (e: "click"): void;
  (e: "focus"): void;
}>();

const { modelValue, placeholder, focus } = toRefs(props);

const commentInputRef = ref<HTMLDivElement>();
/** 输入框是否聚焦 */
const isFocus = ref(focus.value);
const isMacOS = ref(false);

const keyboardDesc = computed(() => {
  if (isMacOS.value) {
    return "⌘ + Enter";
  }
  return "Ctrl + Enter";
});

const placeholderText = computed(() => {
  if (placeholder.value) {
    return placeholder.value;
  }
  return `输入评论（Enter换行，${keyboardDesc.value}发送）`;
});

/** 是否展示操作按钮 */
const displayOperate = computed(() => {
  return modelValue.value.length > 0 || isFocus.value;
});

const handleFocus = () => {
  isFocus.value = true;
  emits("focus");
};

const handleInputClick = (e: Event) => {
  /** 被点击的元素不是inputRef，就隐藏inputRef */
  if (!focus.value && !commentInputRef.value?.contains(e.target as Node | null)) {
    isFocus.value = false;
  }
};

const handleInput = (value: string) => {
  emits("update:modelValue", value);
};

const handleClick = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  emits("click");
};

const handleSubmit = () => {
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
