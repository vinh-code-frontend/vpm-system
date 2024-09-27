<script setup lang="ts">
import { useValidator } from '@/hooks'
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules, ElButton, vLoading } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import {
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from '@/firebase'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import type { FirebaseError } from 'firebase/app'
import { ErrorNotification, SuccessNotification } from '@/utils/notification'
import { resetForm } from '@/utils/form'

type SignUpModel = {
  email: string
  password: string
  confirmPassword: string
  displayName: string
}

const router = useRouter()
const { required, email, min } = useValidator()

const loading = ref(false)
const formInstance = ref<FormInstance>()
const formModel = reactive<SignUpModel>({
  email: '',
  displayName: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive<FormRules<SignUpModel>>({
  email: [required(), email()],
  displayName: [required()],
  password: [required(), min(6, 'Password')],
  confirmPassword: [
    required(),
    min(6, 'Password'),
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
    loading.value = true
    const isValid = await formInstance.value?.validate()
    if (isValid) {
      const userCredential = await createUserWithEmailAndPassword(auth, formModel.email, formModel.password)
      if (userCredential.user) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          displayName: formModel.displayName,
          email: formModel.email
        })
        SuccessNotification(`Registration successful! Welcome ${formModel.displayName}`)
        router.push({ path: '/' })
      }
    }
  } catch (e) {
    console.log(e)
    const error = e as FirebaseError
    let errorMessage: string = ''
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use!'
    }
    ErrorNotification(errorMessage)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-loading.fullscreen.lock="loading" class="max-w-lg mx-auto py-10">
    <el-form
      ref="formInstance"
      :model="formModel"
      :rules="rules"
      label-position="top"
      require-asterisk-position="right"
      @submit.prevent
    >
      <el-form-item prop="displayName" label="Your Name">
        <el-input v-model="formModel.displayName" />
      </el-form-item>
      <el-form-item prop="email" label="Email">
        <el-input v-model="formModel.email" />
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
      <div class="flex justify-center items-center">
        <router-link to="/login" class="text-center underline hover:text-blue-400 transition duration-100 ease-linear">
          Have an account? Login now
        </router-link>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
