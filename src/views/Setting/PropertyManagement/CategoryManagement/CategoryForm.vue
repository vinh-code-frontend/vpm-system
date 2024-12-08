<script setup lang="ts">
import { IconType, type ICategory } from '@/types/Property';
import { computed, reactive, ref, toRef, watch } from 'vue';
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElColorPicker,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElOption,
  ElIcon,
  ElTag
} from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { useValidator } from '@/hooks';
import _ from 'lodash';
import { useSiteConfig } from '@/stores/siteConfig';
import BaseTag from '@/components/ElementPlus/BaseTag.tsx';

type Props = {
  category?: ICategory;
};

const DEFAULT_CATEGORY: ICategory = {
  id: '',
  name: '',
  description: '',
  tagColor: '',
  iconType: IconType.None
};
const props = defineProps<Props>();

const store = computed(() => ({ ...useSiteConfig() }));
const { required, max } = useValidator();

const formModel = toRef(_.cloneDeep(props.category ?? DEFAULT_CATEGORY));
const formInstance = ref<FormInstance>();
const editNameMode = ref(!props.category);

const isShowIcon = computed<boolean>(() => !!(formModel.value.iconType === IconType.ElementPlus && formModel.value.icon));

const rules = reactive<FormRules<ICategory>>({
  name: [required(), max(30)],
  description: [required(), max(200)]
});

const toggleEditNameMode = (mode?: boolean): void => {
  if (typeof mode === 'boolean') {
    editNameMode.value = mode;
  } else {
    editNameMode.value = !editNameMode.value;
  }
};

const submit = async (): Promise<void> => {
  await formInstance.value?.validate();
  console.log(formModel.value);
};

watch(
  () => isShowIcon.value,
  () => {
    console.log(isShowIcon.value);
  }
);

defineExpose({
  submit
});
</script>

<template>
  <el-form ref="formInstance" :model="formModel" :rules="rules" size="default" label-position="top" require-asterisk-position="right">
    <el-form-item prop="name" label="Category name">
      <div v-if="!editNameMode" class="flex gap-2 items-center">
        <base-tag :color="formModel.tagColor" :icon="formModel.icon" :show-icon="isShowIcon">
          <span>{{ formModel.name }}</span>
        </base-tag>
        <el-icon color="green" class="cursor-pointer" @click="toggleEditNameMode(true)"><Edit /></el-icon>
      </div>
      <el-input v-if="editNameMode" v-model="formModel.name" @blur="toggleEditNameMode(undefined)" />
    </el-form-item>
    <el-form-item prop="description" label="Category description">
      <el-input v-model="formModel.description" type="textarea" :rows="4" />
    </el-form-item>
    <el-form-item prop="iconType" label="Icon type" label-position="left">
      <el-radio-group v-model="formModel.iconType">
        <el-radio :value="IconType.ElementPlus" label="Element icon" />
        <el-radio :value="IconType.None" label="None" />
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="formModel.iconType === IconType.ElementPlus" label="Select icon" label-position="left">
      <el-select v-model="formModel.icon" popper-class="category-icon-dropdown-option" fit-input-width>
        <template #label="{ value }">
          <div class="flex items-center">
            <el-icon :size="18"><component :is="value" /></el-icon>
          </div>
        </template>
        <el-option v-for="item in store.elementIcons" :key="item" :value="item">
          <el-icon><component :is="item" /></el-icon>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="tagColor" label="Tag color" label-position="left">
      <el-color-picker v-model="formModel.tagColor" />
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.category-icon-dropdown-option {
  [role='listbox'] {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    padding-right: 8px;
  }
  [role='option'] {
    padding: 0;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
