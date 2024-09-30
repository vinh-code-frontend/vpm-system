<script setup lang="ts">
import { useValidator } from '@/hooks'
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules, ElButton } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { resetForm } from '@/utils/form'
import { useUserStore } from '@/stores/user'
import { SuccessNotification, ErrorNotification } from '@/utils/notification'
import type { LoginModel } from '@/types/User'
import AuthLayout from '@/layout/AuthLayout.vue'
import { useSiteConfig } from '@/stores/siteConfig'

const router = useRouter()
const { required, email, min } = useValidator()
const store = computed(() => ({ ...useUserStore(), ...useSiteConfig() }))

const formInstance = ref<FormInstance>()

const formModel = reactive<LoginModel>({
  email: '',
  password: ''
})

const rules = reactive<FormRules<LoginModel>>({
  email: [required(), email()],
  password: [required(), min(6, 'Password')]
})

const submitForm = async () => {
  try {
    store.value.setLoading(true)
    const isValid = await formInstance.value?.validate()
    if (isValid) {
      await store.value.login(formModel)
      SuccessNotification(`Login successful! Welcome ${store.value.loginUser?.displayName}`)
      router.push({ path: '/' })
    }
  } catch (e) {
    ErrorNotification()
    console.error(e)
    store.value.setLoading(false)
  }
}
</script>

<template>
  <auth-layout header="Login" redirect-link="/register" redirect-placeholder="Don't have an account? Register now">
    <el-form ref="formInstance" :model="formModel" :rules="rules" label-position="top" require-asterisk-position="right" @submit.prevent>
      <el-form-item prop="email" label="Email">
        <el-input v-model="formModel.email" autocomplete="false" />
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input v-model="formModel.password" type="password" autocomplete="off" />
      </el-form-item>
      <div class="flex justify-center items-center mb-2">
        <el-button @click="resetForm(formInstance)"> Reset </el-button>
        <el-button type="primary" @click="submitForm"> Login </el-button>
      </div>
    </el-form>
  </auth-layout>
</template>
