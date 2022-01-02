<template>
  <el-dialog v-model="modelValue" width="300px" @close="handleClose">
    <template v-slot:title>
      <div class="text-base text-gray-800 font-semibold">发表评论</div>
    </template>
    <el-form ref="ruleform" :model="form" size="small">
      <el-form-item
        prop="nickname"
        :rules="[{ required: true, message: '昵称不能为空', trigger: 'blur' }]"
      >
        <el-input v-model="form.nickname" placeholder="昵称(必填)">
          <template #prefix>
            <div class="h-full flex items-center">
              <Icon icon="user" :size="16" bg-color="none" :scale="1" />
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        :rules="[
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="form.email" placeholder="邮箱(必填)">
          <template #prefix>
            <div class="h-full flex items-center">
              <Icon icon="mail" :size="16" bg-color="none" :scale="1" />
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="site">
        <el-input v-model="form.site" placeholder="个人网站(选填)">
          <template #prefix>
            <div class="h-full flex items-center">
              <Icon icon="global" :size="16" bg-color="none" :scale="1" />
            </div>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="w-full" type="primary" size="small" width="100%" @click="submit"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Icon from "@/components/Icon/index.vue";
import { http } from "@/common/js/http";
import { apis } from "@/api";
import { useStore } from "@/store";
import { IVisitor } from "@/store/modules/interface/visitor";

withDefaults(
  defineProps<{
    modelValue: boolean;
  }>(),
  {
    modelValue: false,
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", visible: boolean): void;
}>();

const store = useStore();

const ruleform = ref();

const form = ref({
  nickname: "",
  email: "",
  site: "",
});

const handleClose = () => {
  emits("update:modelValue", false);
};

const visitorLogin = async () => {
  return await http<{ success: boolean; data: IVisitor }>(
    {
      method: "post",
      url: apis.visitorLogin,
      data: {
        nickname: form.value.nickname,
        email: form.value.email,
        site: form.value.site,
      },
    },
    ""
  );
};

const submit = () => {
  ruleform.value.validate(async (valid: boolean) => {
    if (valid) {
      const { success, data } = await visitorLogin();
      if (success) {
        store.commit("visitor/setVisitor", data);
        handleClose();
      }
    }
  });
};
</script>

<style lang="scss" scoped></style>
