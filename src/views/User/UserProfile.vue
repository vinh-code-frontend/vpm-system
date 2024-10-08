<script setup lang="ts">
import { useFirestore } from '@/hooks'
import { useUserStore } from '@/stores/user'
import { ElCard, ElRow, ElCol, ElButton, ElIcon, ElDialog } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import UserAvatar from '@/components/UserAvatar.vue'
import type { User } from '@/types/User'
import { where } from 'firebase/firestore'
import EditProfile from '@/components/EditProfile.vue'

const route = useRoute()
const store = useUserStore()
const { getItemByQuery } = useFirestore()

const currentUser = ref<User>()
const photoUrl = ref<string | undefined>(undefined)

const isLoginUser = computed<boolean>(() => (store.loginUser ? route.params.userId === store.loginUser?.slug : false))
const profileHeader = computed(() => (isLoginUser.value ? 'Your Profile' : "User's profile"))
const projectHeader = computed(() => (isLoginUser.value ? 'Project' : 'Project'))

const loading = ref(true)
const editFormVisible = ref(false)

const openEditDialog = () => {
  editFormVisible.value = true
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
            <el-button v-if="isLoginUser" type="success" plain class="bottom-0 right-0" @click="openEditDialog">
              <el-icon><Edit /></el-icon>
              <span> Edit profile </span>
            </el-button>
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
  <el-dialog
    v-if="currentUser"
    v-model="editFormVisible"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    title="Edit profile"
    append-to-body
    class="!w-full max-w-[800px]"
  >
    <edit-profile v-model="editFormVisible" :user="currentUser" />
  </el-dialog>
</template>

<style lang="scss" scoped>
.user-profile-avatar {
  :deep(.el-icon) {
    font-size: 80px;
  }
}
</style>
