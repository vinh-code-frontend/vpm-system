import { db } from '@/firebase';
import { FirestoreCollection } from '@/types/Firestore';
import { doc, getDoc, getDocs, query, type DocumentData, QueryConstraint, collection, limit, setDoc, addDoc } from 'firebase/firestore';
import { ref } from 'vue';

const useFirestore = (collectionName: `${FirestoreCollection}`) => {
  const categoreyRef = collection(db, collectionName);

  const getItems = async <T>(): Promise<T[]> => {
    try {
      const result: T[] = [];
      const querySnapshop = await getDocs(categoreyRef);
      querySnapshop.forEach((snapshot) => {
        const temp = { ...snapshot.data(), id: snapshot.id } as T;
        result.push(temp);
      });
      return result ?? [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const getItem = async <T>(uid: string): Promise<T | null> => {
    try {
      const docSnap = await getDoc(doc(db, collectionName, uid));
      return (docSnap.data() as T) ?? null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getItemByQuery = async <T>(...queryConstraints: QueryConstraint[]): Promise<T | null> => {
    try {
      let result: T | null = null;
      const querySnapshop = await getDocs(query(categoreyRef, ...queryConstraints, limit(1)));

      querySnapshop.forEach((item) => {
        if (item.data()) {
          result = item.data() as T;
        }
      });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const setItem = async <T extends Record<string, any>>(uid: string, payload: T): Promise<T> => {
    await setDoc(doc(db, collectionName, uid), payload);
    return payload;
  };

  const addItem = async <T extends Record<string, any>>(payload: T): Promise<T> => {
    const data = await addDoc(categoreyRef, payload);
    const result = { ...payload, id: data.id };
    console.log(data);
    return result;
  };

  return {
    getItems,
    getItem,
    getItemByQuery,
    setItem,
    addItem
  };
};

export default useFirestore;
