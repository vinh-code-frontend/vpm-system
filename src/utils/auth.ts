import { auth } from '@/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'

export const onAuthChanged = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
