<template>
  <div class="w-full bg-gray-100">
    <div class="max-w-5xl m-auto">
      <div class="grid grid-cols-12 mt-4 mb-8">
        <!-- 文章列表 -->
        <div
          class="pb-4 bg-white rounded shadow-sm lg:col-span-9 md:col-span-12"
          v-infinite-scroll="onPageChange"
        >
          <ArticleCard
            v-for="article in articleState.list"
            :key="article.id"
            :article="article"
          />
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
import { reactive, onMounted } from "vue";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { IArticleState, IFetchArticleListResponse } from "./interface";
import ArticleCard from "./components/article-card/index.vue";
import Author from "./components/author/index.vue";
import Footer from "./components/footer/index.vue";

const articleState = reactive<IArticleState>({
  type: "全部",
  limit: 20,
  offset: 0,
  total: 0,
  list: [],
  hasMore: false,
});

/** 获取文章列表 */
const fetchArticleList = async (limit: number, offset: number, type: string) => {
  const { total, list } = await http<IFetchArticleListResponse>(
    {
      method: "post",
      url: apis.fetchArtistList,
      data: { limit, offset, type },
    },
    "data"
  );
  articleState.total = total;
  articleState.list = articleState.list.concat(list);
  articleState.hasMore = limit + offset < total;
};

/** 下拉加载 */
const onPageChange = () => {
  if (articleState.hasMore) {
    articleState.offset += articleState.limit;
    fetchArticleList(articleState.limit, articleState.offset, articleState.type);
  }
};

/** 自增用户访问量 */
const addUserViewCountById = async () => {
  await http({ url: apis.addUserViewCountById });
};

onMounted(() => {
  addUserViewCountById();
  fetchArticleList(articleState.limit, articleState.offset, articleState.type);
});
</script>

<style lang="scss" scoped></style>
