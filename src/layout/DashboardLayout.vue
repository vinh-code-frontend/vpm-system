<script setup lang="ts">
import LeftMenu from '@/components/LeftMenu/LeftMenu.vue'
import TopbarVue from '@/components/Topbar/TopbarVue.vue'
import { auth } from '@/firebase'
import { useFirestore } from '@/hooks'
import { useSiteConfig } from '@/stores/siteConfig'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/User'
import { ElScrollbar } from 'element-plus'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const { getItem } = useFirestore()
const store = { ...useUserStore(), ...useSiteConfig() }

onMounted(async () => {
  if (auth.currentUser?.uid) {
    store.setLoading(true)
    const user = await getItem<User>('users', auth.currentUser.uid)
    if (user) {
      store.setLoginUser(user)
    }
  }
  loading.value = false
  store.setLoading(false)
})
</script>

<template>
  <div class="flex">
    <left-menu />
    <div class="flex-1 bg-slate-50">
      <topbar-vue />
      <div class="px-4 py-3">
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
