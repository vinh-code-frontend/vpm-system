<script setup lang="ts">
import type { ITag } from '@/types/Property';
import { Plus } from '@element-plus/icons-vue';
import { ElTable, ElTableColumn, ElButton } from 'element-plus';
import { ref } from 'vue';
import ManagementLayout from '@/layout/ManagementLayout.vue';
import BaseTag from '@/components/ElementPlus/BaseTag.vue';

const tableData = ref<ITag[]>([
  {
    id: '1',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ipsum quae itaque quod molestias earum modi officiis doloremque ea, consectetur adipisci debitis sit vero! Ad error sint aspernatur eum sit!',
    name: 'Tag 1',
    tagColor: '#a164df',
    iconLink: ''
  }
]);

const openAddDrawer = () => {};

const editTag = (item: ITag) => {};

const deleteTag = (item: ITag) => {};
</script>

<template>
  <management-layout title="Tag Management" add-button-label="Add Tag" @click-add-button="openAddDrawer">
    <el-table :data="tableData">
      <el-table-column type="index" />
      <el-table-column label="Name" prop="name" width="180"></el-table-column>
      <el-table-column label="Tag" width="180">
        <template #default="scope">
          <base-tag :color="scope.row.tagColor">{{ scope.row.name }}</base-tag>
        </template>
      </el-table-column>
      <el-table-column label="Description" prop="description" min-width="200"></el-table-column>
      <el-table-column label="Actions" fixed="right" width="160">
        <template #default="scope">
          <div class="flex items-center">
            <el-button size="small" type="warning" @click="editTag(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @@click="deleteTag(scope.row)">Delete</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </management-layout>
</template>

<style lang="scss" scoped></style>
