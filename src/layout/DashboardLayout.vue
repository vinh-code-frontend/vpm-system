<script setup lang="ts">
import LeftMenu from '@/components/LeftMenu.vue'
import TopbarVue from '@/components/TopbarVue.vue'
import { auth } from '@/firebase'
import { useUserStore } from '@/stores/user'
import { ElScrollbar, vLoading } from 'element-plus'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const store = useUserStore()

onMounted(async () => {
  await store.getLoginUser(auth.currentUser?.uid)
  loading.value = false
})
</script>

<template>
  <div v-if="loading" v-loading="true" class="w-screen h-screen"></div>
  <div v-if="!loading" class="flex">
    <left-menu />
    <div class="flex-1 bg-slate-50">
      <topbar-vue />
      <el-scrollbar class="!h-[calc(100vh-var(--header-height))]">
        <div class="px-4 py-3">
          <router-view :key="$route.path" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
