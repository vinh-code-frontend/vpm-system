<script setup lang="ts">
import type { User } from '@/types/User'
import { onMounted, reactive, ref } from 'vue'
import UserAvatar from '@/components/UserAvatar.vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  type FormInstance,
  type FormRules,
  ElButton,
  type UploadFile,
  ElIcon,
  type UploadRawFile
} from 'element-plus'
import { useValidator } from '@/hooks'
import { CameraFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
const props = defineProps<{
  modelValue: boolean
  user: User
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const { required, email, max } = useValidator()
const store = useUserStore()

const formInstance = ref<FormInstance>()
const formModel = reactive<User>({ ...props.user })
const photoURL = ref(props.user.photoURL)
const loading = ref(false)
const avatarFile = ref<UploadRawFile>()

const rules = reactive<FormRules<User>>({
  email: [required(), email(), max(100)],
  displayName: [required(), max(100)]
})

const onUploadChange = async (uploadFile: UploadFile) => {
  if (!uploadFile.raw) {
    return
  }
  const url = URL.createObjectURL(uploadFile.raw)
  photoURL.value = url
  avatarFile.value = uploadFile.raw
  console.log({ url, raw: uploadFile.raw })
}

const closeDialog = () => {
  emits('update:modelValue', !props.modelValue)
}

const updateProfile = () => {
  formInstance.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true
      const payload = { ...formModel }
      await store.updateUser(payload, avatarFile.value)
      loading.value = false
    }
  })
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
    <div class="flex-1 inline-flex justify-center relative">
      <user-avatar
        :key="props.user.photoURL"
        v-model="photoURL"
        class="w-full overflow-hidden rounded-full text-[54px] max-w-48 aspect-square object-cover shadow-lg"
      />
      <el-upload :auto-upload="false" accept="image/*" :show-file-list="false" action="''" :on-change="onUploadChange">
        <el-button type="success" plain :icon="CameraFilled" circle class="absolute bottom-0" />
      </el-upload>
    </div>
  </div>
  <div class="flex justify-end">
    <el-button @click="closeDialog">Cancel</el-button>
    <el-button type="success" :loading="loading" @click="updateProfile">Save</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
