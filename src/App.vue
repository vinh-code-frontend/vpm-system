<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSiteConfig } from './stores/siteConfig'
import { ElConfigProvider, vLoading } from 'element-plus'

const globalStore = useSiteConfig()
</script>

<template>
  <el-config-provider size="large">
    <div v-loading.fullscreen.lock="globalStore.globalLoading" class="min-h-screen">
      <router-view />
    </div>
  </el-config-provider>
</template>
