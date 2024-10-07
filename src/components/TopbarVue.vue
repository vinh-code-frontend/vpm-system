<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus'
import { Setting, User, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import UserAvatar from './UserAvatar.vue'
import { useSiteConfig } from '@/stores/siteConfig'

const store = useUserStore()
const config = useSiteConfig()
const dropdownRef = ref<InstanceType<typeof ElDropdown>>()

const displayName = computed<string>(() => store.loginUser?.displayName ?? '')
const slug = computed(() => store.loginUser?.slug)

const onDropdownClicked = () => {
  dropdownRef.value?.handleClose()
}

const onLogOut = () => {
  store.logout()
}

onMounted(() => {})
</script>

<template>
  <div class="h-[50px] border-[--el-border-color] border-b border-solid flex items-center justify-between leading-none gap-2 px-4">
    <div
      class="cursor-pointer"
      @click="
        () => {
          config.setMenuCollapse(!config.isMenuCollapse)
        }
      "
    >
      <el-icon v-if="config.isMenuCollapse"><expand /></el-icon>
      <el-icon v-else><fold /></el-icon>
    </div>
    <el-dropdown ref="dropdownRef" trigger="click">
      <span class="flex items-center gap-2 font-semibold">
        <div>{{ displayName }}</div>
        <user-avatar v-if="store.loginUser" v-model="store.loginUser.photoURL" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link :to="`/user/${slug}`" class="flex items-center px-3 py-1" @click="onDropdownClicked">
              <el-icon><user /></el-icon>
              <span>Your profile</span>
            </router-link>
          </el-dropdown-item>
          <!-- <el-dropdown-item>
            <router-link to="/settings" class="flex items-center px-3 py-1" @click="onDropdownClicked">
              <el-icon><setting /></el-icon>
              <span>Settings</span>
            </router-link>
          </el-dropdown-item> -->
          <el-dropdown-item divided @click="onLogOut">
            <div class="flex items-center px-3 py-1">
              <el-icon><switch-button /></el-icon>
              <span>Log out</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item) {
  padding: 0;
}
</style>
