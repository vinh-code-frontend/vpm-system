import { auth } from '@/firebase'
import { useFirestore } from '@/hooks'
import type { LoginModel, RegisterModel, User } from '@/types/User'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export namespace UserStoreType {
  export type State = {
    loginUser: User | null
  }
  export type Getter = {}
  export type Action = {
    setLoginUser(payload: User | null): void
    getLoginUser(uid?: string): Promise<void>
    login(loginPayload: LoginModel): Promise<void>
    register(registerPayload: RegisterModel): Promise<void>
    logout(): Promise<void>
  }
}

const { getItem, setItem } = useFirestore()

export const useUserStore = defineStore<'user', UserStoreType.State, UserStoreType.Getter, UserStoreType.Action>('user', {
  state: () => ({
    loginUser: null
  }),
  getters: {},
  actions: {
    setLoginUser(payload) {
      this.loginUser = payload
    },
    async getLoginUser(uid) {
      const userId = uid ?? auth.currentUser?.uid
      if (userId) {
        const user = await getItem<User>('users', userId)
        if (user) {
          this.setLoginUser(user)
        } else {
          this.setLoginUser(null)
        }
      }
    },
    async login(loginPayload) {
      const userCredential = await signInWithEmailAndPassword(auth, loginPayload.email, loginPayload.password)
      if (userCredential.user) {
        await this.getLoginUser(userCredential.user.uid)
      }
    },
    async register(registerPayload) {
      const userCredential = await createUserWithEmailAndPassword(auth, registerPayload.email, registerPayload.password)
      if (userCredential.user) {
        const slug = uuidv4()
        const payload: User = {
          displayName: registerPayload.displayName,
          email: registerPayload.email,
          slug,
          uid: userCredential.user.uid
        }
        await Promise.all([
          setItem('users', payload.uid, payload),
          updateProfile(userCredential.user, {
            displayName: payload.displayName
          })
        ])
        this.setLoginUser(payload)
      }
    },
    async logout() {
      await signOut(auth)
      this.setLoginUser(null)
      location.reload()
    }
  }
})
