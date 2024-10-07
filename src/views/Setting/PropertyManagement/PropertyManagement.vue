<script setup lang="ts">
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import TagManagement from './TagManagement/TagManagement.vue'
import CategoryManagement from './CategoryManagement/CategoryManagement.vue'

enum PropertyMenu {
  Tag = 'tag',
  Category = 'category'
}

const selectedTab = ref<PropertyMenu>(PropertyMenu.Category)
</script>

<template>
  <el-tabs v-model="selectedTab" type="border-card">
    <el-tab-pane label="Category" :name="PropertyMenu.Category">
      <category-management />
    </el-tab-pane>
    <el-tab-pane label="Tag" :name="PropertyMenu.Tag">
      <tag-management />
    </el-tab-pane>
  </el-tabs>
</template>
<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>
