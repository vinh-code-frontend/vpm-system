<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { watch } from 'vue'

const route = useRoute()

watch(
  () => route.path,
  () => {
    document.title = 'VPM System | ' + route.meta.title
  }
)
</script>

<template>
  <el-config-provider size="default">
    <div class="h-screen">
      <router-view />
    </div>
  </el-config-provider>
</template>
