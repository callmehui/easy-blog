<template>
  <div class="px-8 pb-6 mt-4 bg-white">
    <!-- 发表评论 -->
    <div class="pt-6">
      <!-- 标题 -->
      <div class="text-lg text-gray-800 font-semibold mb-6">评论</div>
      <!-- 发表评论输入框 -->
      <div class="flex">
        <Icon
          v-if="!visitor.id"
          icon="user-avatar"
          :size="40"
          bgColor="#c8c8c8"
          color="#fff"
          :scale="0.6"
          @click="handleShowDialog"
        />
        <el-upload
          v-else
          class="avatar-uploader"
          :action="apis.imageUpload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="visitor.portrait"
            class="w-10 h-10 rounded-[20px] border border-gray-400 box-border"
            :src="visitor.portrait"
          />
          <Icon
            v-else
            icon="user-avatar"
            :size="40"
            bgColor="#c8c8c8"
            color="#fff"
            :scale="0.6"
          />
        </el-upload>
        <CommentInput
          class="flex-1 ml-4"
          v-model="commentValue"
          @click="handleShowDialog"
          @submit="handleSubmitComment(commentValue)"
        />
      </div>
    </div>
    <!-- 热门评论 -->
    <!-- 全部评论 -->
    <div class="pt-8" v-if="comments && comments.length > 0">
      <div class="text-lg text-gray-800 font-semibold py-2">全部评论</div>
      <div>
        <CommentItem
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          @update-comment="handleUpdateComment"
          @re-fetch-comment="handldReFetchComment"
          @submit="handleSubmitComment"
        >
          <div
            v-if="comment.children.length > 0"
            class="px-4 pb-4 mt-4 rounded bg-gray-50"
          >
            <CommentItem
              v-for="commentItem in comment.children"
              :key="commentItem.id"
              :isChildren="true"
              :comment="commentItem"
              :parentComment="comment"
              @update-comment="handleUpdateComment"
              @re-fetch-comment="handldReFetchComment"
              @show-dialog="handleShowDialog"
              @submit="handleSubmitComment"
            />
          </div>
        </CommentItem>
      </div>
    </div>
    <CommentModal v-model="showDialog" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from "vue";
import { ElMessage as message } from "element-plus";
import { CommentType } from "./interface";
import CommentInput from "./components/comment-input/index.vue";
import CommentItem from "./components/comment-item/index.vue";
import CommentModal from "./components/comment-modal/index.vue";
import Icon from "../Icon/index.vue";
import { addComment, updatePortrait, useComments } from "./hooks/useComments";
import { CommentTypeName, IAddCommentParams, ICommentItem } from "./hooks/interface";
import { useStore } from "@/store";
import { apis } from "@/api";
import { serverUrlProd } from "@/api/common";

const props = withDefaults(
  defineProps<{
    id: number;
    type?: CommentType;
  }>(),
  {
    type: "article",
  }
);

const store = useStore();

const { id, type } = toRefs(props);

const commentValue = ref<string>("");
const showDialog = ref(false);

const { data: comments, refetch } = useComments(id, type);

const visitor = computed(() => store.state.visitor.visitor);

const handleUpdateComment = (comment: ICommentItem) => {
  if (comments.value) {
    comments.value = comments.value.map((item) => {
      if (item.id === comment.id) {
        return comment;
      }
      return item;
    });
  }
};

const handldReFetchComment = () => {
  refetch.value();
};

/** 用户头像上传前触发的钩子函数 */
const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 1;

  if (!isJPG && !isPNG) {
    message.error("上传头像图片只能是 JPG 或 PNG 格式!");
  }
  if (!isLt2M) {
    message.error("上传头像图片大小不能超过 1MB!");
  }
  return (isJPG || isPNG) && isLt2M;
};

/** 用户头像上传成功出发的钩子函数 */
const handleAvatarSuccess = async (res: { success: boolean; data: { url: string } }) => {
  if (res.success) {
    let url = res.data.url;
    let fileUrl = "";
    url.split("\\").forEach((item) => {
      fileUrl += item + "/";
    });
    fileUrl = fileUrl.substr(0, fileUrl.length - 1);
    const filePath = serverUrlProd + fileUrl;
    store.commit("visitor/setVisitor", {
      ...visitor.value,
      portrait: filePath,
    });
    /** 把上传的头像更新到数据库中 */
    if (visitor.value.id) {
      await updatePortrait(visitor.value.id, filePath);
      store.commit("visitor/setVisitor", {
        ...visitor.value,
        portrait: filePath,
      });
    }
  }
};

/** 用户输入评论前，校验是否登录过 */
const handleShowDialog = () => {
  if (!visitor.value.id) {
    showDialog.value = true;
  }
};

/** 发表评论 */
const handleSubmitComment = async (comment: string, beCommentId?: number) => {
  if (visitor.value.id && type.value) {
    let typeName: CommentTypeName = "articleId";
    switch (type.value) {
      case "talk":
        typeName = "talkId";
        break;
      case "article":
        typeName = "articleId";
        break;
      case "novel":
        typeName = "novelId";
        break;
      case "about":
        typeName = "aboutId";
        break;
      default:
        typeName = "articleId";
        break;
    }
    const params: IAddCommentParams = {
      visitorId: visitor.value.id,
      typeName,
      comment: comment,
      publishTime: Number(Date.now() / 1000),
      parentId: id.value,
      beCommentId,
      limit: 100,
      offset: 0,
    };
    await addComment(params);
    if (!beCommentId) {
      commentValue.value = "";
    }
    refetch.value();
  }
};
</script>

<style lang="scss" scoped></style>
