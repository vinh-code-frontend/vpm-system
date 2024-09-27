<script setup lang="ts">
import { useSiteConfig } from '@/stores/siteConfig'
import { useUserStore } from '@/stores/user'
import { computed, onMounted } from 'vue'

const store = computed(() => ({ ...useUserStore(), ...useSiteConfig() }))

onMounted(() => {
  store.value.setLoading(false)
})
</script>

<template>
  <div v-loading.fullscreen.lock="store.loading" class="max-w-lg mx-auto py-10">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
