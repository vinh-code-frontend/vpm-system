<script setup lang="ts">
import { ElDrawer, type DrawerProps } from 'element-plus'
import { useSlots } from 'vue'

const model = defineModel<boolean>()
const props = defineProps<Partial<DrawerProps>>()
const slots = useSlots()
</script>

<template>
  <el-drawer v-model="model" :with-header="false" :v-bind="props">
    <div class="relative">
      <div>drawer</div>
      <slot name="default"></slot>
      <div v-if="slots['footer']" class="flex items-center justify-end gap-2 absolute">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
