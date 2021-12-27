<template>
  <div class="px-6">
    <div class="pt-6">
      <!-- 文章简略信息：作者、发布时间 -->
      <div class="mb-1 text-base font-medium text-gray-700">
        {{ content.authorName }}
      </div>
      <div class="mb-6 text-sm text-gray-500">
        <span>
          {{ formatTime(content.publishTime * 1000, "yyyy年MM月dd日") }}
        </span>
        <span class="ml-2">
          阅读
          <span>{{ content.viewCount }}</span>
        </span>
      </div>
      <img
        class="w-full mb-5"
        v-if="content.introduceImg"
        :src="content.introduceImg"
        alt="文章配图"
      />
      <div class="mb-5 text-3xl font-semibold text-gray-800">
        {{ content.title }}
      </div>
    </div>
    <!-- 文章内容 -->
    <div
      class="article-content text-[15px] text-gray-800 border-b border-gray-200"
      v-html="articleContent"
    ></div>
  </div>
</template>

<!-- 文章内容 -->
<script lang="ts" setup>
import { computed } from "vue";
import marked from "marked";
import hljs from "highlight.js";
import { formatTime } from "@/common/js/util";
import { IArticleDetail } from "../../interface";

const { content } = defineProps<{
  content: IArticleDetail;
}>();

marked.setOptions({
  renderer: new marked.Renderer(),
  // highlight: function (code, lang) {
  //   const language = hljs.getLanguage(lang) ? lang : "plaintext";
  //   return hljs.highlight(code, { language }).value;
  // },
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  gfm: true,
  pedantic: false,
  sanitize: false,
  breaks: true,
  smartLists: true,
  smartypants: false,
});

const articleContent = computed(() => marked(content.content));
</script>

<style lang="scss" scoped>
.article-content {
  text-align: left;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.75;

  & :deep() h1,
  & :deep() h2,
  & :deep() h3,
  & :deep() h4,
  & :deep() h5,
  & :deep() h6 {
    font-weight: bold;
    line-height: 1.5;
    margin-top: 35px;
    margin-bottom: 10px;
    padding-bottom: 5px;
  }
  & :deep() h4 {
    font-size: 16px;
  }

  & :deep() img {
    width: 100%;
    margin: 1rem 0;
    border: 1px solid rgb(243, 244, 246);
    border-radius: 4px;
  }
  /* 美化markdown */
  & :deep() p {
    font-size: 15px;
    margin: 22px 0;
  }
  & :deep() ol {
    list-style: auto;
    padding-left: 28px;
  }
  & :deep() ul {
    list-style: auto;
    padding-left: 28px;
  }
  & :deep() li {
    font-size: 15px;
    margin-bottom: 8px;
  }
  & :deep() pre {
    display: block;
    background-color: #283646;
    padding: 0.5rem !important;
    overflow-y: auto;
    font-weight: 300;
    font-family: Menlo, monospace;
    border-radius: 0.3rem;
  }
  & :deep() pre > code {
    border: 0px !important;
    background-color: #283646 !important;
    color: #fff;
  }
  & :deep() code {
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
    margin: 0px 3px;
    width: calc(100% - 10px);
    box-sizing: border-box;
  }
  & :deep() a {
    text-decoration: none;
    color: #0269c8;
    border-bottom: 1px solid #d1e9ff;
  }
  & :deep() blockquote {
    color: #666;
    padding: 1px 23px;
    margin: 22px 0;
    border-left: 4px solid #cbcbcb;
    background-color: #f8f8f8;
  }
  & :deep() table {
    display: inline-block !important;
    font-size: 12px;
    width: auto;
    max-width: 100%;
    overflow: auto;
    border: 1px solid #f6f6f6;
  }
  & :deep() thead {
    background: #f6f6f6;
    color: #000;
    text-align: left;
  }
  & :deep() td,
  & :deep() th {
    padding: 12px 7px;
    line-height: 24px;
  }
  & :deep() td {
    min-width: 120px;
  }
}
</style>
