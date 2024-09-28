<script setup lang="ts">
import { useSiteConfig } from '@/stores/siteConfig'
import { computed, onMounted, withDefaults } from 'vue'
import { ElCard } from 'element-plus'

withDefaults(
  defineProps<{
    header?: string
    redirectLink?: string
    redirectPlaceholder?: string
  }>(),
  {
    header: undefined,
    redirectLink: '#',
    redirectPlaceholder: undefined
  }
)

const store = computed(() => ({ ...useSiteConfig() }))

onMounted(() => {
  store.value.setLoading(false)
})
</script>

<template>
  <div v-loading.fullscreen.lock="store.loading" class="w-screen h-screen auth-bg">
    <div class="max-w-lg mx-auto py-10">
      <el-card shadow="hover">
        <div v-if="header && !$slots.header" class="font-playpen-600 text-3xl text-center pb-5">{{ header }}</div>
        <div v-if="$slots.header" class="pb-5">
          <slot name="header"></slot>
        </div>
        <slot></slot>
        <div v-if="$slots.link" class="mt-4">
          <slot name="link"></slot>
        </div>
        <div v-if="!$slots.link && redirectPlaceholder" class="flex justify-center items-center">
          <router-link :to="redirectLink" class="text-center underline hover:text-blue-400 transition duration-100 ease-linear mt-4">
            {{ redirectPlaceholder }}
          </router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-bg {
  background: rgb(227, 227, 252);
  background: linear-gradient(90deg, rgba(227, 227, 252, 0.691841702501313) 0%, rgba(214, 248, 255, 1) 100%);
}
</style>
