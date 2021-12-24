<template>
  <div class="w-full bg-gray-100">
    <div class="max-w-6xl m-auto">
      <div class="bg-white py-2 text-gray-700 text-2xl font-bold mt-4 pb-4 text-center rounded-tl-lg rounded-tr-lg border-b border-gray-200 ">文章封面生成器</div>
      <div class="grid grid-cols-12  mb-8 rounded-bl-lg rounded-br-lg  bg-white">
        <!-- 工具条 -->
        <div class="lg:col-span-4 md:col-span-12  rounded-bl-lg border-r border-gray-200 pt-5">
          <el-form class="form-reset px-4" size="small" label-position="top" :model="form">
            <el-form-item label="封面标题：">
              <el-input v-model="form.title" placeholder="输入封面标题" />
            </el-form-item>
            <el-form-item label="封面小标题：">
              <el-input v-model="form.subTitle" placeholder="输入封面小标题" />
            </el-form-item>
            <el-form-item class="relative" label="封面配图1：">
              <el-upload class="absolute top-[-36px] left-20 font-semibold text-blue-500" :action="apis.imageUpload" list-type="text" :on-success="handleImage1Success">
                <div>（点击上传配图）</div>
              </el-upload>
              <el-input v-model="form.image1" placeholder="输入封面配图1" />
            </el-form-item>
            <el-form-item class="relative" label="封面配图2：">
              <el-upload class="absolute top-[-36px] left-20 font-semibold text-blue-500" :action="apis.imageUpload" list-type="text" :on-success="handleImage2Success">
                  <div>（点击上传配图）</div>
              </el-upload>
              <el-input v-model="form.image2" placeholder="输入封面配图2" />
            </el-form-item>
            <el-form-item label="生成图片名称：">
              <el-input v-model="form.name" placeholder="输入生成图片名称" />
            </el-form-item>
            <el-form-item label="生成图片格式：">
              <el-select v-model="form.imageType" placeholder="选择生成图片格式">
                <el-option v-for="type in imageTypes" :key="type" :label="type" :value="type"></el-option>
              </el-select>
            </el-form-item>
            <div class="mt-2 mb-4  btn btn-primary" @click="downCoverImage">生成文章封面</div>
            <div class="mt-2 mb-4 ml-5 btn btn-secondary" @click="resetForm">重置</div>
          </el-form>
        </div> 
        <!-- 预览界面 -->
        <div class="lg:col-span-8 md:col-span-12  rounded-br-lg pt-5">
          <div
            class="mx-4 py-8 bg-gray-900 flex justify-center "
          >
            <CoverTemplete1 :is-download="isDownload" :cover="form" @update-is-download="handleIsDownloadUpdate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 封面生成器 -->
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { CoverImageType, ICoverDesigner, IImageUploadResponse } from './interface';
import CoverTemplete1 from './components/cover-templete1/index.vue';
import { apis } from "@/api";
import { serverUrlProd } from '@/api/common';
import { ElMessage } from 'element-plus';

/** 封面图片类型 */
const imageTypes:CoverImageType[] = ["png", "jpg", "svg"];

/** 是否下载封面 */
const isDownload = ref(false);
const form = reactive<ICoverDesigner>({
  title: '', /** 封面标题 */
  subTitle: '', /** 封面小标题 */
  image1: '', /** 封面配图1 */
  image2: '', /** 封面配图2 */
  template: '模板1', /** 封面模板 */
  name: 'cover', /** 封面图片名称 */
  imageType: 'png', /** 图片类型 */
});

/** 更新是否下载 */
const handleIsDownloadUpdate = (download: boolean) => {
  isDownload.value = download;
}

/** 上传配图1成功触发 */
const handleImage1Success = (response: IImageUploadResponse) => {
  handleImageSuccess(response, 'image1');
}

/** 上传配图2成功触发 */
const handleImage2Success = (response: IImageUploadResponse) => {
  handleImageSuccess(response, 'image2');
}

/** 上传配图 */
const handleImageSuccess = (response: IImageUploadResponse, type = 'image1') => {
  ElMessage.success('上传图片成功');
  const { data } = response;
  const imageUrl = `${serverUrlProd}${data.url}`;
  if(type == 'image1') {
    form.image1 = imageUrl;
  } else {
    form.image2 = imageUrl;
  }
}

/** 加载示例数据 */
const loadExampleData = () => {
  const exampleData: ICoverDesigner = {
    title: '手写前端面试题', /** 封面标题 */
    subTitle: '每天一篇短文章，每天进步一点点', /** 封面小标题 */
    image1: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx3.sinaimg.cn%2Fmw690%2F5f808b33ly1gtiphdw1qmj210z117jx2.jpg&refer=http%3A%2F%2Fwx3.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635558644&t=7e78332ae1fd1fabdc7c055225e74f27', /** 封面配图1 */
    image2: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201604%2F09%2F20160409012110_XEfFy.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635563063&t=a59acdafb19a06f13d9ecb5607255858', /** 封面配图2 */
    template: '模板1', /** 封面模板 */
    name: 'cover', /** 封面图片名称 */
    imageType: 'png', /** 图片类型 */
  }
  form.title = exampleData.title;
  form.subTitle = exampleData.subTitle;
  form.image1 = exampleData.image1;
  form.image2 = exampleData.image2;
  form.template = exampleData.template;
  form.name = exampleData.name;
  form.imageType = exampleData.imageType;
}

/** 执行下载命令 */
const downCoverImage = () => isDownload.value = true;

/** 重置配图参数 */
const resetForm = () => {
  const initData:ICoverDesigner = {
    title: '', /** 封面标题 */
    subTitle: '', /** 封面小标题 */
    image1: '', /** 封面配图1 */
    image2: '', /** 封面配图2 */
    template: '模板1', /** 封面模板 */
    name: 'cover', /** 封面图片名称 */
    imageType: 'png', /** 图片类型 */
  }
  form.title = initData.title;
  form.subTitle = initData.subTitle;
  form.image1 = initData.image1;
  form.image2 = initData.image2;
  form.template = initData.template;
  form.name = initData.name;
  form.imageType = initData.imageType;
}

onMounted(() => {
  loadExampleData();
});

</script>

<style lang="scss" scoped>
.form-reset {
  .el-form-item {
    margin-bottom: 12px;
    :deep(.el-form-item__label) {
      font-weight: 600;
      font-size: 1rem;
      padding-bottom: 4px;
    }
  }

  :deep(.el-upload-list) {
    display: none;
  }
  :deep(.el-select) {
    width: 100%;
  }
}
</style>