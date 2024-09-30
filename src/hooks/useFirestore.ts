import { db } from '@/firebase'
import { FirestoreCollection } from '@/types/Firestore'
import { doc, getDoc, getDocs, Query, type DocumentData, query, QueryConstraint, collection, limit, setDoc } from 'firebase/firestore'

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

  const getItemByQuery = async <T>(collectionName: `${FirestoreCollection}`, ...queryConstraints: QueryConstraint[]): Promise<T | null> => {
    try {
      let result: T | null = null
      const querySnapshop = await getDocs(query(collection(db, collectionName), ...queryConstraints, limit(1)))

      querySnapshop.forEach((item) => {
        if (item.data()) {
          result = item.data() as T
        }
      })
      return result
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const setItem = async <T extends Record<string, any>>(collectionName: `${FirestoreCollection}`, uid: string, payload: T): Promise<T> => {
    await setDoc(doc(db, collectionName, uid), payload)
    return payload
  }

  return {
    getItems,
    getItem,
    getItemByQuery,
    setItem
  }
}

export default useFirestore
