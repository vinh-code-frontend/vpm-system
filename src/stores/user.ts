import { auth, storage } from '@/firebase';
import { useFirestore } from '@/hooks';
import type { LoginModel, RegisterModel, User } from '@/types/User';
import type { UploadRawFile } from 'element-plus';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { uploadBytesResumable, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export namespace UserStoreType {
  export type State = {
    loginUser: User | null;
  };
  export type Getter = {};
  export type Action = {
    setLoginUser(payload: User | null): void;
    getLoginUser(uid?: string): Promise<void>;
    login(loginPayload: LoginModel): Promise<void>;
    register(registerPayload: RegisterModel): Promise<void>;
    logout(): Promise<void>;
    updateUser(user: User, newAvatarImage?: UploadRawFile): Promise<void>;
  };
}

const { getItem, setItem } = useFirestore('users');

export const useUserStore = defineStore<'user', UserStoreType.State, UserStoreType.Getter, UserStoreType.Action>('user', {
  state: () => ({
    loginUser: null
  }),
  getters: {},
  actions: {
    setLoginUser(payload) {
      this.loginUser = payload;
    },
    async getLoginUser(uid) {
      const userId = uid ?? auth.currentUser?.uid;
      if (userId) {
        const user = await getItem<User>(userId);
        await auth.currentUser?.reload();
        if (user) {
          this.setLoginUser(user);
        } else {
          this.setLoginUser(null);
        }
      }
    },
    async login(loginPayload) {
      const userCredential = await signInWithEmailAndPassword(auth, loginPayload.email, loginPayload.password);
      if (userCredential.user) {
        await this.getLoginUser(userCredential.user.uid);
      }
    },
    async register(registerPayload) {
      const userCredential = await createUserWithEmailAndPassword(auth, registerPayload.email, registerPayload.password);
      if (userCredential.user) {
        const slug = uuidv4();
        const payload: User = {
          displayName: registerPayload.displayName,
          email: registerPayload.email,
          slug,
          uid: userCredential.user.uid
        };
        await Promise.all([
          setItem(payload.uid, payload),
          updateProfile(userCredential.user, {
            displayName: payload.displayName
          })
        ]);
        this.setLoginUser(payload);
      }
    },
    async logout() {
      await signOut(auth);
      this.setLoginUser(null);
      location.reload();
    },
    async updateUser(user, newAvatarImage) {
      const payload = { ...user };
      const promises: Promise<any>[] = [];
      if (newAvatarImage) {
        const storageReference = storageRef(storage, `avatars/${newAvatarImage.name}`);
        const uploadTask = await uploadBytesResumable(storageReference, newAvatarImage);
        const urlLink = await getDownloadURL(uploadTask.ref);
        payload.photoURL = urlLink;
        promises.push(
          updateProfile(auth.currentUser!, {
            displayName: payload.displayName,
            photoURL: payload.photoURL
          })
        );
      }
      promises.push(setItem(user.uid, payload));
      await Promise.all(promises);

      await this.getLoginUser(user.uid);
    }
  }
});
