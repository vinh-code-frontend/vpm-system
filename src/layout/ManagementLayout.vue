<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { useSlots } from 'vue'

const props = defineProps<{
  title?: string
  addButtonLabel?: string
}>()

const emits = defineEmits<{
  (e: 'click-add-button'): void
}>()

const clickAddButton = () => {
  emits('click-add-button')
}

const slots = useSlots()
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between gap-4 items-center pb-[15px] border-b border-solid border-[var(--el-border-color)]">
      <div v-if="slots['header']">
        <slot name="header"></slot>
      </div>
      <template v-else>
        <h3 v-if="props.title" class="font-semibold">{{ props.title }}</h3>
        <el-button v-if="props.addButtonLabel" :icon="Plus" type="primary" size="small" @click="clickAddButton">
          {{ props.addButtonLabel }}
        </el-button>
      </template>
    </div>
    <div class="max-w-full min-w-0 pt-[15px]">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
