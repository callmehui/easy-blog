<template>
  <div class="bg-white rounded-b-lg">
    <div
      class="w-full h-20 bg-center bg-no-repeat bg-cover rounded-t-lg"
      :style="{ backgroundImage: `url(${userInfo.bgImg})` }"
    ></div>
    <div
      class="flex items-center relative left-6 top-[-20px] cursor-pointer"
      @click="gotoAboutPage"
    >
      <img
        class="w-16 h-16 rounded-[32px] border-2 border-white shadow-md"
        :src="userInfo.portrait"
        alt="头像"
      />
      <span class="ml-2 text-lg font-medium text-gray-700 relative top-[8px]">{{
        userInfo.username
      }}</span>
    </div>
    <!-- 文章统计 -->
    <div class="flex mx-8 mt-2">
      <div class="flex-1 text-center">
        <p class="mb-2 text-[15px] font-medium text-blue-500">
          {{ userInfo.articleCount }}
        </p>
        <p class="mb-2 text-[15px] font-medium text-gray-500">文章</p>
      </div>
      <!-- <div class="flex-1 text-center">
        <p class="mb-2 text-[15px] font-medium text-blue-500">
          {{ userInfo.novelCount }}
        </p>
        <p class="mb-2 text-[15px] font-medium text-gray-500">小说</p>
      </div>
      <div class="flex-1 text-center">
        <p class="mb-2 text-[15px] font-medium text-blue-500">
          {{ userInfo.talkCount }}
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
        :content="userInfo.githubUrl"
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
        :content="userInfo.weChatAccount"
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
        :content="userInfo.qqAccount"
        placement="top"
      >
        <div class="flex justify-center flex-1">
          <i
            class="text-2xl text-gray-600 cursor-pointer iconfont icon-qq-fill"
          ></i>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gotoAboutPage } from "@/common/js/router";
import { IUserInfo } from "../../interface";

defineProps<{ userInfo: IUserInfo }>();
</script>

<style lang="scss" scoped></style>
