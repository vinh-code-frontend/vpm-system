<script setup lang="ts">
import { auth, db } from '@/firebase'
import { DocumentName, usersCollection } from '@/firebase/firestore'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { onMounted, reactive, ref } from 'vue'

const getData = async () => {
  const querySnapshot = await getDocs(usersCollection)

  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`)
    console.log(doc.data())
  })
}
const formModel = ref<any>({
  email: '',
  password: '',
  confirmPassword: ''
})

const newUser = () => {
  setDoc(doc(db, DocumentName.User, formModel.value.email), {
    email: formModel.value.email,
    createdAt: new Date()
  })
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div>User Management</div>
  <button @click="newUser">new</button>
  <input v-model="formModel.email" />
  <input v-model="formModel.password" />
</template>

<style lang="scss" scoped></style>
