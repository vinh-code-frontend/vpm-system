<script setup lang="ts">
import { ElTag, ElIcon, type TagProps } from 'element-plus';
import { type CSSProperties, computed } from 'vue';
import { generateElColor } from '@/utils/color';
import { IconType } from '@/types/Property';

interface Props extends TagProps {
  icon?: string;
  showIcon?: IconType;
}

const props = defineProps<Partial<Props>>();

const isShowIcon = computed<boolean>(() => {
  const defaultShow = props.showIcon === IconType.ElementPlus;
  return typeof props.icon === 'string' && defaultShow;
});

const elStyles = computed<CSSProperties>(() => {
  let temp: CSSProperties = {};
  if (props.color) {
    const colors = generateElColor(props.color);
    temp = colors;
    temp.backgroundColor = `var(${colors['--el-color-primary-light-5']})`;
  }
  return temp;
});
</script>

<template>
  <el-tag :v-bind="props" :style="elStyles">
    <div class="flex items-center gap-1">
      <template v-if="isShowIcon">
        <el-icon>
          <component :is="props.icon" />
        </el-icon>
      </template>
      <slot name="default"></slot>
    </div>
  </el-tag>
</template>

<style scoped lang="scss"></style>
