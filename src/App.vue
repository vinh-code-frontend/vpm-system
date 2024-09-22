<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSiteConfig } from './stores/siteConfig'
import { onMounted } from 'vue'

const globalStore = useSiteConfig()
console.log('app.vue')

onMounted(() => {
  console.log('mounted app.vue')
})
</script>

<template>
  <div v-loading="globalStore.globalLoading" class="min-h-screen">
    <router-view />
  </div>
</template>
