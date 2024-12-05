<script setup lang="ts">
import ElementDrawer from '@/components/ElementPlus/ElementDrawer.vue'
import { IconType, type ICategory } from '@/types/Property'
import { reactive, ref } from 'vue'
import { ElButton, ElForm, ElFormItem, type FormInstance, type FormRules, ElInput, ElColorPicker } from 'element-plus'
import { useValidator } from '@/hooks'
import _ from 'lodash'
import { resetForm } from '@/utils/form'

const DEFAULT_CATEGORY = {
  id: '',
  name: '',
  description: '',
  tagColor: '',
  iconType: IconType.None
}

const isDrawerVisible = defineModel<boolean>()
const props = withDefaults(
  defineProps<{
    category?: ICategory
  }>(),
  {
    category() {
      return {
        id: '',
        name: '',
        description: '',
        tagColor: '',
        iconType: IconType.None
      }
    }
  }
)

const formModel = ref<ICategory>(_.cloneDeep(props.category))
const { required, max } = useValidator()
const loading = ref(false)
const formInstance = ref<FormInstance>()

const rules = reactive<FormRules<ICategory>>({
  name: [required(), max(30)],
  description: [required(), max(200)]
})

const initForm = (): ICategory => {
  return DEFAULT_CATEGORY
}

const submitForm = async () => {
  try {
    await formInstance.value?.validate()
    console.log(formModel.value)
  } catch (error) {
    console.error(error)
  }
}

const onComponentMounted = () => {
  formModel.value = _.cloneDeep(props.category)
}

const onComponentBeforeUnmount = () => {
  loading.value = false
  formModel.value = initForm()
  resetForm(formInstance.value)
}
</script>

<template>
  <element-drawer v-model="isDrawerVisible" title="Header" :loading="loading">
    <div @vue:mounted="onComponentMounted" @vue:before-unmount="onComponentBeforeUnmount">
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
    </div>
    <template #footer>
      <el-button @click="isDrawerVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Save</el-button>
    </template>
  </element-drawer>
</template>

<style lang="scss" scoped></style>
