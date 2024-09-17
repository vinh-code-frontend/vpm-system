<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElButton, ElInput } from 'element-plus'
import firebase from './firebase'
import { signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword, deleteUser, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

const auth = firebase.getAuth()
const email = ref('')
const password = ref('')
const test = () => {
  console.log(auth.currentUser)
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}

onAuthStateChanged(auth, (user) => {
  console.log(user)
})
</script>

<template>
  <header>
    <el-button @click="test">Test</el-button>
    <el-input v-model="email" />
    <el-input v-model="password" />
    <div class="flex">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
