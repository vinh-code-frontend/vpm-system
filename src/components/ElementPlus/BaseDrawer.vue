<script setup lang="ts">
import { Close } from '@element-plus/icons-vue';
import { ElDrawer, type DrawerProps, ElIcon, vLoading, ElScrollbar } from 'element-plus';
import { ref, useSlots, type VNode, type Slots } from 'vue';

interface IProps extends DrawerProps {
  loading: boolean;
}

interface MyComponentSlots extends Slots {
  default?: () => VNode[];
  footer?: () => VNode[];
}

const model = defineModel<boolean>();
const props = withDefaults(defineProps<Partial<IProps>>(), {
  loading: false
});
const slots = useSlots() as MyComponentSlots;

const drawerRef = ref<InstanceType<typeof ElDrawer>>();

defineExpose({
  drawerRef
});
</script>

<template>
  <el-drawer
    ref="drawerRef"
    v-model="model"
    :v-bind="props"
    :with-header="false"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="!w-full ssm:!w-120 element-drawer"
  >
    <div v-loading="loading" class="relative leading-none p-5 h-screen flex flex-col">
      <header class="flex justify-between gap-2 items-center pb-4 border-b border-solid border-[var(--el-border-color)]">
        <div class="font-semibold">{{ props.title }}</div>
        <el-icon class="cursor-pointer hover:text-[var(--el-color-primary)]" size="large" @click="drawerRef?.handleClose">
          <close />
        </el-icon>
      </header>
      <div class="py-4 flex-1 overflow-hidden">
        <el-scrollbar v-if="slots['default']">
          <slot name="default"></slot>
        </el-scrollbar>
      </div>

      <div v-if="slots['footer']" class="flex items-center justify-end bottom-0 left-0 right-0 bg-white">
        <slot name="footer"></slot>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss">
.element-drawer .el-drawer__body {
  padding: 0;
}
</style>
