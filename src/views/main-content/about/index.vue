<template>
  <div class="w-full bg-gray-100">
    <div class="max-w-5xl m-auto">
      <div class="grid grid-cols-12 mt-4 mb-8">
        <div
          class="px-5 py-6 pb-4 bg-white rounded shadow-sm lg:col-span-9 md:col-span-12"
        >
          <div class="about-content">
            <h2 class="pb-2 text-2xl font-semibold border-b border-gray-100">
              <span>👋 大家好，我是爱编程的Mark!</span>
              <span>✨</span>
            </h2>

            <p>
              我是<strong>爱编程的Mark</strong>，本名<strong>钟辉</strong>，一位前端工程师、开源作者。
            </p>

            <p>
              从2021年7月开始，我开始对开源感兴趣，了解了开源并开始维护了第一个开源项目：<a
                href="https://music-player.immortalboy.cn/"
                target="_blank"
                >仿网易云音乐web版本</a
              >，你可以在<a
                href="https://github.com/callmehui/web-music-player"
                target="_blank"
                >github</a
              >上访问和获取它。
            </p>

            <p>
              我于2017年毕业于<a href="http://www.hubu.edu.cn/" target="_blank"
                >湖北大学</a
              >，软件工程专业，曾在<a href="https://www.hand-china.com/" target="_blank"
                >上海汉得</a
              >、<a href="https://www.jinrirencai.com/" target="_blank">深圳今日人才</a
              >和<a href="https://www.casstime.com/" target="_blank">深圳开思时代</a
              >工作过。
            </p>

            <p>
              作为一名技术工作者，我有一年的前后端开发经验，三年纯前端开发经验。我在工作中使用过包括<strong>Javascript</strong>、<strong>php</strong>、<strong>Java</strong>在内的编程语言，擅长的前端技术栈主要包括：<strong>Vue3</strong>、<strong>Vue</strong>、<strong>React</strong>、<strong>Typescript</strong>、<strong
                >Tailwind CSS</strong
              >
              等。我目前有兴趣并准备纳入个人前端武器库的技术有：<strong>nuxt3</strong>(即将发布)、<strong>quasar</strong>、<strong>alpine.js</strong>等。
            </p>

            <p>
              我喜欢去学习和研究一些能够提升个人开发效率的技术，希望用它们快速把我乍现的想法实现成可用的Demo。
            </p>

            <p>
              我的<router-link to="/resume">简历</router-link>是可用的，如果你有任何想法。
            </p>

            <p>
              给我发邮件<a href="mailto:1126765590hui@gmail.com"
                >1126765590hui@gmail.com</a
              >，或者在下方留下评论。
            </p>
          </div>

          <Comment type="about" :id="0" />

          <div class="mt-8">
            <div class="pb-1 text-2xl font-semibold border-b border-gray-100">
              我最近的篇{{ state.limit }}博文
            </div>
            <div class="my-5" v-for="article in state.list" :key="article.id">
              <router-link
                class="text-lg font-medium text-blue-500 no-underline"
                :to="`/article-detail/${article.id}`"
              >
                {{ article.title }}
              </router-link>
              <div class="text-gray-500">
                {{ formatTime(article.publishTime, "yyyy年MM月dd日") }}
              </div>
            </div>
          </div>
        </div>

        <!-- 个人信息 -->
        <div class="col-span-3 ml-5 rounded">
          <div class="fixed w-[236px]">
            <Author />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 关于我 -->
<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import Author from "../home/components/author/index.vue";
import Footer from "../home/components/footer/index.vue";
import { ILatestArticleListResponse, ILatestArticleListState } from "./interface";
import { formatTime } from "@/common/js/util";
import Comment from "@/components/comment/index.vue";

const state = reactive<ILatestArticleListState>({
  limit: 3,
  list: [],
});

const fetchLatestArticle = async (limit: number) => {
  const { list } = await http<ILatestArticleListResponse>(
    { url: `${apis.fetchLatestArticle}/${limit}` },
    "data"
  );
  console.log("list", list);
  state.list = list;
};

/** 自增用户访问量 */
const addUserViewCountById = async () => {
  await http({ url: apis.addUserViewCountById });
};

onMounted(() => {
  addUserViewCountById();
  fetchLatestArticle(state.limit);
});
</script>

<style lang="scss" scoped>
.about-content {
  font-size: 16px;
  p {
    margin: 1rem 0;
    line-height: 1.8;
  }

  a {
    text-decoration: underline;
    color: rgb(59, 130, 246);
  }
}
</style>
