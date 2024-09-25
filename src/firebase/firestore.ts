import { collection } from 'firebase/firestore'
import { db } from '.'

export const DocumentName = {
  User: 'users'
}

export const usersCollection = collection(db, DocumentName.User)
