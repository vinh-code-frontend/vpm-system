<script setup lang="ts">
import { ElCard, ElAvatar, ElRow, ElCol } from 'element-plus'
</script>

<template>
  <el-row :gutter="8">
    <el-col :span="10" :xs="24" class="pb-2 md:pb-0">
      <el-card shadow="never">
        <template #header>
          <h3 class="font-bold text-lg">Your Profile</h3>
        </template>
        <div class="flex">
          <el-avatar></el-avatar>
        </div>
      </el-card>
    </el-col>
    <el-col :span="14" :xs="24" class="pb-2 md:pb-0">
      <el-card shadow="never">
        <template #header>
          <h3 class="font-bold text-lg">Your Project</h3>
        </template>
        <div class="flex"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped></style>
