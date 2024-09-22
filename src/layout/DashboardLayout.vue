<script setup lang="ts">
import LeftMenu from '@/components/LeftMenu/LeftMenu.vue'
import TopbarVue from '@/components/Topbar/TopbarVue.vue'
</script>

<template>
  <topbar-vue />
  <div class="flex">
    <left-menu />
    <div class="px-5 py-3 flex-1">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
