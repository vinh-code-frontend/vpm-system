<script setup lang="ts">
import { ElScrollbar, ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { Files, Notebook, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()
</script>

<template>
  <div class="border-[--el-border-color] border-r border-solid">
    <h3 class="font-playpen-600 px-[--el-menu-level-padding] leading-[--header-height]">VPM System</h3>
    <el-scrollbar class="!h-[calc(100vh-var(--header-height))]">
      <el-menu :default-active="currentRoute.path" class="!border-0 font-semibold" router>
        <el-menu-item index="/overview">
          <el-icon><Files /></el-icon>
          <template #title>Overview</template>
        </el-menu-item>
        <el-menu-item index="/log-work">
          <el-icon><Notebook /></el-icon>
          <template #title>Log work</template>
        </el-menu-item>
        <el-menu-item index="/user-management">
          <el-icon><Lock /></el-icon>
          <template #title>User Management</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss"></style>
