<script setup lang="ts">
import { useValidator } from '@/hooks'
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules, ElButton } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import type { FirebaseError } from 'firebase/app'
import { ErrorNotification, SuccessNotification } from '@/utils/notification'
import { resetForm } from '@/utils/form'
import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from '@/stores/user'
import AuthLayout from '@/layout/AuthLayout.vue'
import { useSiteConfig } from '@/stores/siteConfig'

type RegisterModel = {
  email: string
  password: string
  confirmPassword: string
  displayName: string
}

const router = useRouter()
const { required, email, min } = useValidator()
const store = computed(() => ({ ...useUserStore(), ...useSiteConfig() }))

const formInstance = ref<FormInstance>()
const formModel = reactive<RegisterModel>({
  email: '',
  displayName: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive<FormRules<RegisterModel>>({
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
    store.value.setLoading(true)
    const isValid = await formInstance.value?.validate()
    if (isValid) {
      const userCredential = await createUserWithEmailAndPassword(auth, formModel.email, formModel.password)
      if (userCredential.user) {
        const slug = uuidv4()

        await Promise.all([
          setDoc(doc(db, 'users', userCredential.user.uid), {
            displayName: formModel.displayName,
            email: formModel.email,
            slug,
            uid: userCredential.user.uid
          }),
          updateProfile(userCredential.user, {
            displayName: formModel.displayName
          })
        ])
        store.value.setLoginUser({
          displayName: formModel.displayName,
          email: formModel.displayName,
          slug,
          uid: userCredential.user.uid
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
    store.value.setLoading(false)
  }
}
</script>

<template>
  <auth-layout>
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
      <div class="flex justify-center items-center">
        <router-link to="/login" class="text-center underline hover:text-blue-400 transition duration-100 ease-linear">
          Have an account? Login now
        </router-link>
      </div>
    </el-form>
  </auth-layout>
</template>

<style scoped lang="scss"></style>
