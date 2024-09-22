<script setup lang="ts">
import { auth } from '@/firebase'
import { computed, ref } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { Setting, User, SwitchButton } from '@element-plus/icons-vue'
import { signOut } from 'firebase/auth'

const dropdownRef = ref<InstanceType<typeof ElDropdown>>()

const displayName = computed(() => auth.currentUser?.displayName ?? auth.currentUser?.email)

const onDropdownClicked = () => {
  console.log('click')
  dropdownRef.value?.handleClose()
}

const onLogOut = async () => {
  await signOut(auth)
  location.reload()
}
</script>

<template>
  <div class="h-[50px] border-[--el-border-color] border-b border-solid flex items-center justify-between leading-none px-4 gap-2">
    <div class="font-playpen-600">Topbar</div>
    <div>
      <el-dropdown ref="dropdownRef" trigger="click">
        <span class="el-dropdown-link">
          <div>{{ displayName }}</div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="User">
              <router-link to="/me" @click="onDropdownClicked">Your profile</router-link>
            </el-dropdown-item>
            <el-dropdown-item :icon="Setting">
              <router-link to="/me" @click="onDropdownClicked">Settings</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided :icon="SwitchButton" @click="onLogOut">Log out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
