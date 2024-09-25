<script setup lang="ts">
import { ElCard, ElForm, ElFormItem, ElInput } from 'element-plus'
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <h3>Personal</h3>
        <div class="flex"></div>
      </template>
      <el-form>
        <el-form-item>
          <el-input />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
