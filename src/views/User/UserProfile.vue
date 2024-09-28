<script setup lang="ts">
import { useFirestore } from '@/hooks'
import { useUserStore } from '@/stores/user'
import { ElCard, ElAvatar, ElRow, ElCol, ElUpload, type UploadFile, type UploadUserFile, type UploadProps } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'

const route = useRoute()
const store = useUserStore()
const { getItems } = useFirestore()

const uploadRef = ref<InstanceType<typeof ElUpload>>()

const isLoginUser = computed<boolean>(() => (store.loginUser ? route.params.userId === store.loginUser?.slug : false))
const profileHeader = computed(() => (isLoginUser.value ? 'Your Profile' : "User's profile"))
const projectHeader = computed(() => (isLoginUser.value ? 'Your Projects' : "User's projects"))

const uploadedFile = ref<UploadFile | null>(null)
const onUploadChange = async (uploadFile: UploadFile) => {
  console.log(uploadFile)
  if (uploadedFile.value) {
    uploadRef.value?.handleRemove(uploadedFile.value)
  }
  uploadedFile.value = uploadFile
  const url = URL.createObjectURL(uploadFile.raw as Blob)
  console.log(url)
  uploadAvatar.value = url
}

const imageUrl = ref<any>('')

const uploadAvatar = ref<string>('')
onMounted(() => {
  console.log(route)
  console.log(store.loginUser?.slug)
})
</script>

<template>
  <el-row :gutter="8">
    <el-col :span="10" :xs="24" class="pb-2 md:pb-0">
      <el-card shadow="never">
        <template #header>
          <h3 class="font-bold text-lg">{{ profileHeader }}</h3>
        </template>
        <div class="flex items-center justify-center">
          <el-upload ref="uploadRef" action="''" :auto-upload="false" :on-change="onUploadChange" accept="image/*">
            <template #file="{}">
              <img :src="uploadAvatar" />
            </template>
            <el-button>Upload</el-button>
          </el-upload>
        </div>
      </el-card>
    </el-col>
    <el-col :span="14" :xs="24" class="pb-2 md:pb-0">
      <el-card shadow="never">
        <template #header>
          <h3 class="font-bold text-lg">{{ projectHeader }}</h3>
        </template>
        <div class="flex"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.user-profile-avatar {
  :deep(.el-icon) {
    font-size: 80px;
  }
}
</style>
