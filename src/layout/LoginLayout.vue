<script setup lang="ts">
import { auth, db } from '@/firebase'
import { useValidator } from '@/hooks'
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules, ElButton, vLoading } from 'element-plus'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { resetForm } from '@/utils/form'
import { doc, getDoc } from 'firebase/firestore'
import { useUserStore } from '@/stores/user'
import { SuccessNotification } from '@/utils/notification'
import type { User } from '@/types/User'

type SignInModel = {
  email: string
  password: string
}
const router = useRouter()
const { required, email, min } = useValidator()
const userStore = useUserStore()

const loading = ref(false)
const formInstance = ref<FormInstance>()

const formModel = reactive<SignInModel>({
  email: '',
  password: ''
})

const rules = reactive<FormRules<SignInModel>>({
  email: [required(), email()],
  password: [required(), min(6, 'Password')]
})

const submitForm = async () => {
  try {
    loading.value = true
    const isValid = await formInstance.value?.validate()
    if (isValid) {
      const userCredential = await signInWithEmailAndPassword(auth, formModel.email, formModel.password)
      if (userCredential.user) {
        const docSnap = await getDoc(doc(db, 'users', userCredential.user.uid))
        const user = docSnap.data() as User | undefined
        if (user) {
          userStore.setLoginUser({
            displayName: user.displayName,
            email: user.email,
            slug: user.slug,
            uid: user.uid
          })
        }

        SuccessNotification(`Login successful! Welcome`)

        router.push({ path: '/' })
      }
    }
  } catch (e) {
    console.log(e)
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
      <div class="flex justify-center items-center">
        <router-link
          to="/register"
          class="text-center underline hover:text-blue-400 transition duration-100 ease-linear"
        >
          Don't have an account? Register now
        </router-link>
      </div>
    </el-form>
  </div>
</template>
