<script setup lang="ts">
import { IconType, type ICategory } from '@/types/Property';
import { reactive, ref, toRef, watch } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput, ElColorPicker } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { useValidator } from '@/hooks';
import _ from 'lodash';
import { resetForm } from '@/utils/form';
import { DEFAULT_CATEGORY } from '@/constants';

type Props = {
  category?: ICategory;
};

const props = defineProps<Props>();
console.log(props);

const formModel = toRef(_.cloneDeep(props.category ?? DEFAULT_CATEGORY));
const { required, max } = useValidator();
const loading = ref(false);
const formInstance = ref<FormInstance>();

const rules = reactive<FormRules<ICategory>>({
  name: [required(), max(30)],
  description: [required(), max(200)]
});

const submit = async (): Promise<void> => {
  await formInstance.value?.validate();
  console.log(formModel.value);
};

defineExpose({
  submit
});
</script>

<template>
  <el-form ref="formInstance" :model="formModel" :rules="rules" size="default" label-position="top" require-asterisk-position="right">
    <el-form-item prop="name" label="Category name">
      <el-input v-model="formModel.name" />
    </el-form-item>
    <el-form-item prop="description" label="Category description">
      <el-input v-model="formModel.description" type="textarea" :rows="4" />
    </el-form-item>
    <el-form-item prop="tagColor" label="Tag color">
      <el-color-picker v-model="formModel.tagColor" />
    </el-form-item>
    <el-form-item prop="iconType"> </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
