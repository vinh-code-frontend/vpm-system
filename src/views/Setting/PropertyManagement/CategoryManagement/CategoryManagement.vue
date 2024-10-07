<script setup lang="ts">
import type { ICategory } from '@/types/Property'
import { Plus } from '@element-plus/icons-vue'
import { ElTable, ElTableColumn, ElButton, ElTag } from 'element-plus'
import { ref } from 'vue'
import ElementTag from '@/components/ElementPlus/ElementTag.tsx'
import ManagementLayout from '@/layout/ManagementLayout.vue'

const tableData = ref<ICategory[]>([
  {
    id: '1',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ipsum quae itaque quod molestias earum modi officiis doloremque ea, consectetur adipisci debitis sit vero! Ad error sint aspernatur eum sit!',
    name: 'Category 1',
    tagColor: '#a164df'
  }
])

const openAddDrawer = () => {}

const editCategory = (item: ICategory) => {}

const deleteCategory = (item: ICategory) => {}
</script>

<template>
  <management-layout title="Category Management" add-button-label="Add Category" @click-add-button="openAddDrawer">
    <el-table :data="tableData">
      <el-table-column type="index" />
      <el-table-column label="Name" width="180">
        <template #default="scope">
          <element-tag :color="scope.row.tagColor">{{ scope.row.name }}</element-tag>
        </template>
      </el-table-column>
      <el-table-column label="Description" prop="description" min-width="200"></el-table-column>
      <el-table-column label="Actions" fixed="right" width="160">
        <template #default="scope">
          <div class="flex items-center">
            <el-button size="small" type="warning" @click="editCategory(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @@click="deleteCategory(scope.row)">Delete</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </management-layout>
</template>

<style lang="scss" scoped></style>
