<script setup lang="ts">
import { ElScrollbar, ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { Files, Notebook, Lock, Tools, Collection } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useSiteConfig } from '@/stores/siteConfig'
const { currentRoute } = useRouter()
const config = useSiteConfig()
</script>

<template>
  <div class="border-[--el-border-color] border-r border-solid">
    <el-scrollbar class="!h-[calc(100vh-var(--header-height))]">
      <el-menu
        :default-active="currentRoute.path"
        class="!border-0 font-semibold el-menu-vertical-demo"
        router
        :collapse="config.isMenuCollapse"
      >
        <el-menu-item index="">
          <el-icon v-if="config.isMenuCollapse" class="font-playpen-600">VPM</el-icon>
          <template v-if="!config.isMenuCollapse" #title><span class="font-playpen-600 text-[18px]">VPM System</span></template>
        </el-menu-item>
        <el-menu-item index="/overview">
          <el-icon><Collection /></el-icon>
          <template #title>Overview</template>
        </el-menu-item>
        <el-menu-item index="/project-management">
          <el-icon><Files /></el-icon>
          <template #title>Project Management</template>
        </el-menu-item>
        <el-menu-item index="/property-management">
          <el-icon><Tools /></el-icon>
          <template #title>Property Management</template>
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

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}
</style>
