<script setup lang="ts">
import { IconType, type ICategory } from '@/types/Property';
import { ElTable, ElTableColumn, ElButton, ElDrawer } from 'element-plus';
import { ref, unref } from 'vue';
import BaseTag from '@/components/ElementPlus/BaseTag';
import ManagementLayout from '@/layout/ManagementLayout.vue';
import CategoryForm from './CategoryForm.vue';
import BaseDrawer from '@/components/ElementPlus/ElementDrawer.vue';

const tableData = ref<ICategory[]>([
  {
    id: '1',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ipsum quae itaque quod molestias earum modi officiis doloremque ea,',
    name: 'Category 1',
    tagColor: '#a164df',
    iconType: IconType.None
  }
]);
const isDrawerVisible = ref(false);
const loading = ref(false);
const selectCategory = ref<ICategory>();
const categoryFormRef = ref<InstanceType<typeof CategoryForm>>();

const openDrawer = (payload?: ICategory) => {
  isDrawerVisible.value = true;
  selectCategory.value = payload;
};

const submitForm = async () => {
  try {
    loading.value = true;
    const form = unref(categoryFormRef);
    await form?.submit();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const editCategory = (item: ICategory) => {};

const deleteCategory = (item: ICategory) => {};
</script>

<template>
  <management-layout title="Category Management" add-button-label="Add Category" @click-add-button="openDrawer">
    <el-table :data="tableData">
      <el-table-column type="index" />
      <el-table-column label="Name" width="180">
        <template #default="scope">
          <base-tag :color="scope.row.tagColor">{{ scope.row.name }}</base-tag>
        </template>
      </el-table-column>
      <el-table-column label="Description" prop="description" min-width="200"></el-table-column>
      <el-table-column label="Actions" fixed="right" width="160">
        <template #default="scope">
          <div class="flex items-center">
            <el-button size="small" type="warning" @click="openDrawer(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="deleteCategory(scope.row)">Delete</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </management-layout>
  <base-drawer v-model="isDrawerVisible" :loading="loading" :title="selectCategory ? 'Edit category' : 'Add category'">
    <category-form ref="categoryFormRef" :category="selectCategory" />
    <template #footer>
      <el-button @click="isDrawerVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Save</el-button>
    </template>
  </base-drawer>
</template>

<style lang="scss" scoped></style>
