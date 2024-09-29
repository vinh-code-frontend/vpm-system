<script setup lang="ts">
import { useFirestore } from '@/hooks'
import { useUserStore } from '@/stores/user'
import { ElCard, ElRow, ElCol, ElButton, ElIcon, ElUpload, type UploadFile } from 'element-plus'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import UserAvatar from '@/components/UserAvatar.vue'
import type { User } from '@/types/User'
import { where } from 'firebase/firestore'
import { CameraFilled } from '@element-plus/icons-vue'
import { ErrorNotification } from '@/utils/notification'
import { getDownloadURL, ref as storageRef, uploadBytesResumable } from 'firebase/storage'
import { auth, storage } from '@/firebase'
import { getAuth, updateProfile } from 'firebase/auth'

const route = useRoute()
const store = useUserStore()
const { getItemByQuery } = useFirestore()

const currentUser = ref<User>()
const photoUrl = ref<string | undefined>(undefined)

const isLoginUser = computed<boolean>(() => (store.loginUser ? route.params.userId === store.loginUser?.slug : false))
const profileHeader = computed(() => (isLoginUser.value ? 'Your Profile' : "User's profile"))
const projectHeader = computed(() => (isLoginUser.value ? 'Project' : 'Project'))

const loading = ref(true)

const onUploadChange = async (uploadFile: UploadFile) => {
  if (!auth.currentUser || !isLoginUser.value) {
    return
  }
  if (!uploadFile.raw) {
    ErrorNotification('Failed to upload avatar!')
    return
  }
  const url = URL.createObjectURL(uploadFile.raw)

  const storageReference = storageRef(storage, `uploads/${uploadFile.name}`)
  const uploadTask = await uploadBytesResumable(storageReference, uploadFile.raw)
  const urlLink = await getDownloadURL(uploadTask.ref)

  await updateProfile(auth.currentUser, {
    photoURL: urlLink
  })
  await auth.currentUser.reload()

  console.log(urlLink)
  photoUrl.value = url
}

onMounted(async () => {
  if (route.params.userId && typeof route.params.userId === 'string') {
    if (route.params.userId === store.loginUser?.slug) {
      currentUser.value = store.loginUser
    } else {
      const otherUser = await getItemByQuery<User>('users', where('slug', '==', route.params.userId))
      if (otherUser) {
        currentUser.value = otherUser
      }
    }
  }
  photoUrl.value = currentUser.value?.photoURL
  console.log(currentUser.value)
  loading.value = false
})
</script>

<template>
  <el-row v-if="currentUser" :gutter="8">
    <el-col :span="10" :xs="24" class="pb-2 md:pb-0">
      <el-card shadow="never">
        <template #header>
          <div class="flex justify-between gap-2">
            <h3 class="font-bold text-lg">{{ profileHeader }}</h3>
            <el-upload :auto-upload="false" accept="image/*" :show-file-list="false" action="''" :on-change="onUploadChange">
              <el-button type="success" plain class="bottom-0 right-0">
                <el-icon><CameraFilled /></el-icon><span> Update Avatar</span>
              </el-button>
            </el-upload>
          </div>
        </template>
        <div class="flex items-center justify-center relative">
          <user-avatar
            :key="photoUrl"
            v-model="photoUrl"
            class="w-full overflow-hidden rounded-full text-[54px] max-w-48 aspect-square object-cover"
          />
        </div>
        <div class="flex justify-between gap-2 mt-3">
          <div class="font-semibold">Display name:</div>
          <div>{{ currentUser.displayName }}</div>
        </div>
        <div class="flex justify-between gap-2">
          <div class="font-semibold">Email:</div>
          <div>{{ currentUser.email }}</div>
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
  <div v-else>There is not specify user</div>
</template>

<style lang="scss" scoped>
.user-profile-avatar {
  :deep(.el-icon) {
    font-size: 80px;
  }
}
</style>
