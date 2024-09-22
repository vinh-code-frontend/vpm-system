<script setup lang="ts">
import { isEmail, isRequired, minCharacters, resetForm } from '@/utils/validator'
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules, ElButton } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword, deleteUser, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'

type SignUpModel = {
  email: string
  password: string
  confirmPassword: string
}

const router = useRouter()

const formInstance = ref<FormInstance>()

const formModel = reactive<SignUpModel>({
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive<FormRules<SignUpModel>>({
  email: [isRequired(), isEmail()],
  password: [isRequired(), minCharacters(6, 'Password')],
  confirmPassword: [
    isRequired(),
    minCharacters(6, 'Password'),
    {
      validator(rule, value, callback) {
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
  const isValid = await formInstance.value?.validate()
  if (isValid) {
    const userCredential = await createUserWithEmailAndPassword(auth, formModel.email, formModel.password)
    if (userCredential) {
      router.push({ path: '/' })
    }
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto py-10">
    <el-form ref="formInstance" :model="formModel" :rules="rules" label-position="top" require-asterisk-position="right" @submit.prevent>
      <el-form-item prop="email" label="Email">
        <el-input v-model="formModel.email" autocomplete="false" />
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input type="password" v-model="formModel.password" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="confirmPassword" label="Confirm Password">
        <el-input type="password" v-model="formModel.confirmPassword" />
      </el-form-item>
      <div class="flex justify-center items-center mb-2">
        <el-button @click="resetForm(formInstance)">Reset</el-button>
        <el-button @click="submitForm">Register</el-button>
      </div>
      <div class="flex justify-center items-center">
        <router-link to="/login" class="text-center underline hover:text-blue-400 transition duration-100 ease-linear">Have an account? Login now</router-link>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
