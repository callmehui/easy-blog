<template>
  <div class="bg-white rounded-b-lg shadow-sm" v-if="userState.userInfo">
    <div
      class="w-full h-20 bg-center bg-no-repeat bg-cover rounded-t-lg"
      :style="{ backgroundImage: `url(${userState.userInfo.bgImg})` }"
    ></div>
    <div
      class="flex items-center relative left-6 top-[-20px] cursor-pointer"
      @click="gotoAboutPage"
    >
      <img
        class="w-16 h-16 rounded-[32px] border-2 border-white shadow-md"
        :src="userState.userInfo.portrait"
        alt="头像"
      />
      <span class="ml-2 text-lg font-medium text-gray-700 relative top-[8px]">{{
        userState.userInfo.username
      }}</span>
    </div>
    <!-- 文章统计 -->
    <div class="flex mx-8 mt-2">
      <div class="flex-1 text-center">
        <p class="mb-2 text-[15px] font-medium text-blue-500">
          {{ userState.userInfo.articleCount }}
        </p>
        <p class="mb-2 text-[15px] font-medium text-gray-500">文章</p>
      </div>
      <!-- <div class="flex-1 text-center">
        <p class="mb-2 text-[15px] font-medium text-blue-500">
          {{ userState.userInfo.novelCount }}
        </p>
        <p class="mb-2 text-[15px] font-medium text-gray-500">小说</p>
      </div>
      <div class="flex-1 text-center">
        <p class="mb-2 text-[15px] font-medium text-blue-500">
          {{ userState.userInfo.talkCount }}
        </p>
        <p class="mb-2 text-[15px] font-medium text-gray-500">说说</p>
      </div> -->
    </div>
    <!-- 社交账号-->
    <el-divider><span class="text-base">社交账号</span></el-divider>
    <div class="flex items-center pb-5">
      <el-tooltip
        class="item"
        effect="dark"
        :content="userState.userInfo.githubUrl"
        placement="top"
      >
        <div class="flex justify-center flex-1">
          <i
            class="text-2xl text-gray-600 cursor-pointer  iconfont icon-github-fill"
          ></i>
        </div>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="userState.userInfo.weChatAccount"
        placement="top"
      >
        <div class="flex justify-center flex-1">
          <i
            class="text-2xl text-gray-600 cursor-pointer  iconfont icon-wechat-fill"
          ></i>
        </div>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        :content="userState.userInfo.qqAccount"
        placement="top"
      >
        <div class="flex justify-center flex-1">
          <i
            class="text-2xl text-gray-600 cursor-pointer iconfont icon-qq-fill"
          ></i>
        </div>
      </el-tooltip>
    </div>
    <!-- 访问量 -->
    <div class="px-4 pb-4 border-t border-gray-200">
      <span
        class="inline-block px-2 py-1 mt-3 mr-1 text-xs text-blue-400 bg-blue-100 border border-blue-200 rounded-md "
      >
        被访问{{ formatNumberToText(userState.userInfo.viewCount) }}次
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { formatNumberToText } from "@/common/js/util";
import { gotoAboutPage } from "@/common/js/router";
import { IUserInfo } from "../../interface";

const userState = reactive<{
  userInfo?: IUserInfo;
}>({
  userInfo: undefined,
});

/** 获取用户信息 */
const fetchUserInfo = async () => {
  const data = await http<IUserInfo>(
    {
      url: apis.fetchUserInfo,
    },
    "data"
  );
  userState.userInfo = data;
};

onMounted(() => {
  fetchUserInfo();
});
</script>

<style lang="scss" scoped></style>
