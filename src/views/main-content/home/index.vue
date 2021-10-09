<template>
  <div class="w-full bg-gray-100">
    <div class="max-w-5xl m-auto">
      <div class="grid grid-cols-12 mt-4 mb-8">
        <!-- 文章列表 -->
        <div class="bg-white rounded shadow-sm lg:col-span-9 md:col-span-12">
          <ArticleCard
            v-for="article in articleState.list"
            :key="article.id"
            :article="article"
          />
        </div>
        <!-- 个人信息 -->
        <div class="ml-5 bg-white rounded shadow-sm lg:col-span-3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { IArticleState, IFetchArticleListResponse } from "./interface";
import ArticleCard from "./components/article-card/index.vue";

const articleState = reactive<IArticleState>({
  limit: 10,
  offset: 0,
  total: 0,
  list: [],
  hasMore: false,
});

/** 获取文章列表 */
const fetchArticleList = async (limit: number, offset: number) => {
  const { total, list } = await http<IFetchArticleListResponse>(
    { method: "post", url: apis.fetchArtistList, data: { limit, offset } },
    "data"
  );
  articleState.total = total;
  articleState.list = list;
  articleState.hasMore = limit + offset < total;
};

onMounted(() => {
  fetchArticleList(articleState.limit, articleState.offset);
});
</script>

<style lang="scss" scoped></style>
