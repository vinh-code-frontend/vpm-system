<script setup lang="ts">
import { ElScrollbar, ElMenu, ElMenuItem, ElIcon } from 'element-plus'
import { Files, Notebook, Lock, Tools, Collection } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useSiteConfig } from '@/stores/siteConfig'

const { currentRoute, push } = useRouter()
const config = useSiteConfig()

const routeMenu = [
  {
    path: '/overview',
    title: 'Overview',
    icon: Collection
  },
  {
    path: '/project-management',
    title: 'Project Management',
    icon: Files
  },
  {
    path: '/property-management',
    title: 'Property Management',
    icon: Tools
  },
  {
    path: '/log-work',
    title: 'Log work',
    icon: Notebook
  },
  {
    path: '/user-management',
    title: 'User Management',
    icon: Lock
  }
]

const onMenuSelect = (path: string) => {
  if (path) {
    push(path)
  }
}
</script>

<template>
  <div class="border-[--el-border-color] border-r border-solid">
    <el-scrollbar class="!h-[calc(100vh-var(--header-height))]">
      <el-menu :default-active="currentRoute.path" class="!border-0 font-semibold el-menu-vertical-demo" :collapse="config.isMenuCollapse">
        <el-menu-item index="">
          <el-icon v-if="config.isMenuCollapse" class="font-playpen-600">VPM</el-icon>
          <template v-if="!config.isMenuCollapse" #title><span class="font-playpen-600 text-[18px]">VPM System</span></template>
        </el-menu-item>
        <el-menu-item v-for="menu in routeMenu" :key="menu.path" :index="menu.path" @click="onMenuSelect(menu.path)">
          <el-icon><component :is="menu.icon" /></el-icon>
          <template #title>{{ menu.title }}</template>
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
