<script setup lang="ts">
import { useValidator } from '@/hooks'
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules, ElButton } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FirebaseError } from 'firebase/app'
import { ErrorNotification, SuccessNotification } from '@/utils/notification'
import { resetForm } from '@/utils/form'
import { useUserStore } from '@/stores/user'
import AuthLayout from '@/layout/AuthLayout.vue'
import { useSiteConfig } from '@/stores/siteConfig'
import type { RegisterModel } from '@/types/User'

const router = useRouter()
const { required, email, min, max } = useValidator()
const store = computed(() => ({ ...useUserStore(), ...useSiteConfig() }))

const formInstance = ref<FormInstance>()
const formModel = reactive<RegisterModel>({
  email: '',
  displayName: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive<FormRules<RegisterModel>>({
  email: [required(), email(), max(100)],
  displayName: [required(), max(100)],
  password: [required(), min(6, 'Password'), max(255)],
  confirmPassword: [
    required(),
    min(6, 'Password'),
    max(255),
    {
      validator(_, value, callback) {
        if (value !== formModel.password) {
          callback(new Error('Confirm password and password must match'))
          return
        }
        callback()
      }
    }
  ]
})

const submitForm = async () => {
  try {
    store.value.setLoading(true)
    const isValid = await formInstance.value?.validate()
    if (isValid) {
      await store.value.register(formModel)
      SuccessNotification(`Registration successful! Welcome ${formModel.displayName}`)
      router.push({ path: '/' })
    }
  } catch (e) {
    console.error(e)
    const error = e as FirebaseError
    let errorMessage: string = ''
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use!'
    }
    ErrorNotification(errorMessage)
    store.value.setLoading(false)
  }
}
</script>

<template>
  <auth-layout redirect-link="/login" redirect-placeholder="Have an account? Login now">
    <template #header>
      <div class="font-playpen-600 text-3xl text-center">Register</div>
    </template>
    <el-form ref="formInstance" :model="formModel" :rules="rules" label-position="top" require-asterisk-position="right" @submit.prevent>
      <el-form-item prop="email" label="Email">
        <el-input v-model="formModel.email" type="email" />
      </el-form-item>
      <el-form-item prop="displayName" label="Your Name">
        <el-input v-model="formModel.displayName" type="text" />
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input v-model="formModel.password" type="password" />
      </el-form-item>
      <el-form-item prop="confirmPassword" label="Confirm Password">
        <el-input v-model="formModel.confirmPassword" type="password" />
      </el-form-item>
      <div class="flex justify-center items-center mb-2">
        <el-button @click="resetForm(formInstance)">Reset</el-button>
        <el-button type="primary" @click="submitForm">Register</el-button>
      </div>
    </el-form>
  </auth-layout>
</template>

<style scoped lang="scss"></style>
