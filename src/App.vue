<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
</script>

<template>
  <el-config-provider size="default">
    <div class="h-screen">
      <router-view />
    </div>
  </el-config-provider>
</template>
