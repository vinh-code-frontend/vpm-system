<script setup lang="ts">
import { auth } from '@/firebase'
import { computed, ref } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { Setting, User, SwitchButton } from '@element-plus/icons-vue'
import { signOut } from 'firebase/auth'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const dropdownRef = ref<InstanceType<typeof ElDropdown>>()

const displayName = computed<string>(() => store.loginUser?.displayName ?? '')
const userId = computed(() => auth.currentUser?.uid)

const onDropdownClicked = () => {
  console.log('click')
  dropdownRef.value?.handleClose()
}

const onLogOut = async () => {
  await signOut(auth)
  store.removeLoginUser()
  location.reload()
}
</script>

<template>
  <div class="h-[50px] border-[--el-border-color] border-b border-solid flex items-center justify-between leading-none gap-2 px-4">
    <div></div>
    <el-dropdown ref="dropdownRef" trigger="click">
      <span class="el-dropdown-link">
        <div>{{ displayName }}</div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="User">
            <router-link :to="`/user/${userId ?? ''}`" @click="onDropdownClicked">Your profile</router-link>
          </el-dropdown-item>
          <el-dropdown-item :icon="Setting">
            <router-link to="/settings" @click="onDropdownClicked">Settings</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided :icon="SwitchButton" @click="onLogOut">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss"></style>
