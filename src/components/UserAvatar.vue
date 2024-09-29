<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  modelValue?: string
  length?: string
  fontSize?: number | string
  class?: string
}>()

const getFontSizeClass = computed<string>(() => {
  if (props.fontSize && !props.modelValue) {
    if (typeof props.fontSize === 'number') {
      return `text-[${props.fontSize}px]`
    }
    return `text-[${props.fontSize}]`
  }

  return ''
})

const getLengthClass = computed<string>(() => {
  if (props.length) {
    return `w-[${props.length}] h-${props.length}`
  }

  if (!props.modelValue) {
    return `w-8 h-8`
  }
  return ``
})

const className = computed<string[] | string>(() => {
  if (props.class) {
    return props.class
  }
  return [
    `object-cover rounded-full overflow-hidden`, //* Default class
    getLengthClass.value,
    getFontSizeClass.value
  ]
})
</script>

<template>
  <img v-if="modelValue" :src="modelValue" :class="className" />
  <div v-else :class="className" class="text-gray-100 bg-[#2cbba0] flex justify-center items-center aspect-square">
    {{ 'User' }}
  </div>
</template>

<style lang="scss"></style>
