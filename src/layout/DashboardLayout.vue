<script setup lang="ts">
import LeftMenu from '@/components/LeftMenu/LeftMenu.vue'
import TopbarVue from '@/components/Topbar/TopbarVue.vue'
</script>

<template>
  <div class="flex">
    <left-menu />
    <div class="px-4 flex-1 bg-slate-50">
      <topbar-vue />
      <div class="py-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
