<script setup lang="ts">
import { useProject } from '@/stores/project'
import type { IProject } from '@/types/Project'
import { computed } from 'vue'
import { ElButton } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const store = useProject()
const projects = computed<IProject[]>(() => store.projects)
</script>

<template>
  <div>
    <div class="flex justify-between items-center gap-2">
      <h3>Projects: {{ projects.length }}</h3>
      <el-button type="primary" size="small" :icon="Plus">Add Project</el-button>
    </div>
    <div class="project-contain">
      <div v-for="project in projects" :key="project.id"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
