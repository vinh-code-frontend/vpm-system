import { db } from '@/firebase'
import { FirestoreCollection } from '@/types/Firestore'
import { doc, getDoc, getDocs, Query, type DocumentData } from 'firebase/firestore'

const useFirestore = () => {
  const getItems = async <T>(query: Query<DocumentData, DocumentData>): Promise<T[]> => {
    try {
      const result: T[] = []
      const querySnapshop = await getDocs(query)
      querySnapshop.forEach((item) => {
        result.push(item.data() as T)
      })
      return result ?? []
    } catch (error) {
      console.error(error)
      return []
    }
  }
  const getItem = async <T>(collectionName: `${FirestoreCollection}`, uid: string): Promise<T | null> => {
    try {
      const docSnap = await getDoc(doc(db, collectionName, uid))
      return (docSnap.data() as T) ?? null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  return {
    getItems,
    getItem
  }
}

export default useFirestore
