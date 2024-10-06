<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { ElRow, ElCol, ElTabs, ElTabPane } from 'element-plus'
import TagManagement from '../ProjectManagement/TagManagement/TagManagement.vue'
import CategoryManagement from '../ProjectManagement/CategoryManagement/CategoryManagement.vue'

const selectedTab = ref('tag')
</script>

<template>
  <el-tabs v-model="selectedTab" type="border-card">
    <el-tab-pane label="Tag" name="tag">
      <tag-management />
    </el-tab-pane>
    <el-tab-pane label="Category" name="category">
      <category-management />
    </el-tab-pane>
  </el-tabs>
</template>
<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>
