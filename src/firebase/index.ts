// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAnalytics, type Analytics } from 'firebase/analytics'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
}

class Firebase {
  private app: FirebaseApp
  private auth: Auth
  private analytics: Analytics | null = null
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth(this.app)
    //this.analytics = getAnalytics(this.app)
  }
  public getApp() {
    return this.app
  }
  public getAuth() {
    return this.auth
  }
  public getAnalytics() {
    return this.analytics
  }
}

export default new Firebase()
