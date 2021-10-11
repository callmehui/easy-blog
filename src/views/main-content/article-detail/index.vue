<template>
  <div class="w-full bg-gray-100">
    <div class="max-w-5xl m-auto">
      <div class="grid grid-cols-12 mt-4 mb-8">
        <!-- 文章内容 -->
        <div
          class="pb-4 bg-white rounded shadow-sm lg:col-span-9 md:col-span-12"
        >
          <ArticleContent
            v-if="articleState.content"
            :content="articleState.content"
          />
        </div>
        <!-- 文章内容导航 -->
        <!-- <div class="right-0 col-span-3 ml-5 rounded shadow-sm"></div> -->
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

<!-- 文章详情 -->
<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { IArticleDetail, IArticleDetailState } from "./interface";
import ArticleContent from "./components/article-content/index.vue";
import Author from "../home/components/author/index.vue";
import Footer from "../home/components/footer/index.vue";

const route = useRoute();

const articleState = reactive<IArticleDetailState>({
  content: undefined,
});

/** 获取文章详情 */
const fetchArticleDetail = async (id: string) => {
  const data = await http<IArticleDetail>(
    {
      url: `${apis.fetchArticleDetail}/${id}`,
    },
    "data"
  );
  articleState.content = data;
};

/** 更新文章访问量 */
const addArticleViewCount = async (id: string) => {
  await http<IArticleDetail>({
    url: `${apis.addArticleViewCountById}/${id}`,
  });
};

/** 自增用户访问量 */
const addUserViewCountById = async () => {
  await http({ url: apis.addUserViewCountById });
};

onMounted(() => {
  addUserViewCountById();
  if (route.params.id) {
    addArticleViewCount(route.params.id as string);
    fetchArticleDetail(route.params.id as string);
  }
});
</script>

<style lang="scss" scoped></style>
