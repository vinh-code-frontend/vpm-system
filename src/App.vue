<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSiteConfig } from './stores/siteConfig'
import { ElConfigProvider, vLoading } from 'element-plus'

const globalStore = useSiteConfig()
</script>

<template>
  <el-config-provider size="default">
    <div v-loading.fullscreen.lock="globalStore.loading" class="min-h-screen">
      <router-view />
    </div>
  </el-config-provider>
</template>
