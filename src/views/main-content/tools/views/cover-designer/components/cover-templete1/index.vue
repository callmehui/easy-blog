<template>
  <div id="cover-designer" class="relative w-[640px] h-[360px] bg-white overflow-hidden">
    <!-- Top-left circle -->
    <div
      aria-hidden="true"
      class="
        absolute
        -top-16
        -left-12
        w-[200px]
        h-[200px]
        bg-purple-200
        rounded-full
        grid
        place-items-center
      "
    >
      <svg
        class="w-[64px] h-[72px] ml-3 mt-3"
        viewBox="0 0 64 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 29.0718C65.3333 32.151 65.3333 39.849 60 42.9282L12 70.641C6.66668 73.7202 1.16801e-05 69.8712 1.19493e-05 63.7128L1.4372e-05 8.28719C1.46412e-05 2.12878 6.66668 -1.72022 12 1.35899L60 29.0718Z"
          fill="white"
        />
      </svg>
    </div>
    <!-- Right big circle -->
    <div
      aria-hidden="true"
      class="
        absolute
        w-[512px]
        h-[512px]
        bg-purple-200
        rounded-full
        -top-20
        -right-56
      "
    ></div>
    <!-- Images -->
    <div class="absolute top-10 right-8">
      <img
        :src="cover.image1"
        alt="封面配图1"
        class="object-cover w-64 shadow-2xl h-36 rounded-2xl rotate-3"
      />
      <img
        :src="cover.image2"
        alt="封面配图2"
        class="object-cover w-64 translate-x-16 -translate-y-2 shadow-2xl  h-36 rounded-2xl -rotate-3"
      />
    </div>
    <!-- Play button -->
    <div class="absolute inset-y-0 grid items-center right-12">
      <a
        href="#"
        class="grid w-12 h-12 transition bg-purple-500 rounded-full  ring-4 ring-white place-items-center hover:bg-purple-400"
      >
        <span class="sr-only"></span>
        <svg
          class="w-4 ml-1"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z"
            fill="white"
          />
        </svg>
      </a>
    </div>
    <!-- Content -->
    <div
      class="relative flex flex-col justify-end w-2/3 h-full p-8 space-y-4"
    >
      <p
        class="text-xs font-semibold tracking-wider text-purple-600 uppercase "
      >
        {{ cover.subTitle }}
      </p>
      <h1 class="text-3xl font-extrabold text-gray-900">
        {{ cover.title }}
      </h1>
      <div class="h-8"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import * as htmlToImage from "html-to-image";
import { computed, onMounted, watch } from "vue";
import { ICoverDesigner } from "../../interface";

const props = defineProps<{
  cover: ICoverDesigner,
  isDownload: boolean;
}>();

const emits = defineEmits<{
  (e: "updateIsDownload", isDownload: boolean): void;
}>();


/** 封面对象 */
const cover = computed(() => props.cover);

/** 是否执行下载方法 */
const isDownload = computed(() => props.isDownload);

/** 下载封面图片 */
const downloadImage = () => {
  const node = document.getElementById("cover-designer");
  const imageType = cover.value.imageType;
  if (node) {

    let toImagePromise: Promise<string>;
    if(imageType === 'png') {
      toImagePromise = htmlToImage.toPng (node, { quality: 0.95 });
    } else if(imageType === 'jpg') {
      toImagePromise = htmlToImage.toJpeg (node, { quality: 0.95 });
    } else {
      toImagePromise = htmlToImage.toSvg (node, { quality: 0.95 });
    }

    toImagePromise.then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = `${cover.value.name}.${cover.value.imageType}`;
      link.href = dataUrl;
      link.click();
      ElMessage.success('生成封面图片成功');
    });
  }
};

watch(isDownload, (nv) => {
  if(nv) {
    downloadImage();
    emits('updateIsDownload', false);
  }
})

</script>

<style lang="scss" scoped></style>
