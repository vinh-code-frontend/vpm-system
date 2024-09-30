<script setup lang="ts">
import type { User } from '@/types/User'
import { onMounted, reactive, ref } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules, ElButton } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
  user: User
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const formModel = reactive<User>({ ...props.user })
const photoURL = ref(props.user.photoURL)

const rules = reactive({})

const onSelectFile = () => {}

const closeDialog = () => {
  emits('update:modelValue', !props.modelValue)
}

onMounted(() => {
  console.log('test')
})
</script>

<template>
  <div class="flex gap-4 pt-4 pb-8 justify-between">
    <div class="flex-1">
      <el-form
        ref="formInstance"
        :model="formModel"
        :rules="rules"
        label-position="top"
        size="large"
        require-asterisk-position="right"
        @submit.prevent
      >
        <el-form-item prop="email" label="Email">
          <el-input v-model="formModel.email" type="email" />
        </el-form-item>
        <el-form-item prop="displayName" label="Your Name">
          <el-input v-model="formModel.displayName" type="text" />
        </el-form-item>
      </el-form>
    </div>
    <div class="flex-1 flex justify-center">
      <user-avatar
        :key="props.user.photoURL"
        v-model="photoURL"
        class="w-full overflow-hidden rounded-full text-[54px] max-w-48 aspect-square object-cover cursor-pointer"
        @click="onSelectFile"
      />
    </div>
  </div>
  <div class="flex justify-end">
    <el-button @click="closeDialog">Cancel</el-button>
    <el-button type="success">Save</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
