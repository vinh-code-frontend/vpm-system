import { createRouter, createWebHistory, type RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { useSiteConfig } from '@/stores/siteConfig'
import DashboardLayout from '../layout/DashboardLayout.vue'
import { auth } from '@/firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardLayout,
      meta: {
        isRequiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../layout/LoginLayout.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../layout/RegisterLayout.vue')
    }
  ]
})

const isFirstTimeAccessApp = (from: RouteLocationNormalizedLoadedGeneric): boolean => {
  return from.name === undefined
}

router.beforeEach(async (to, from, next) => {
  const store = useSiteConfig()
  if (isFirstTimeAccessApp(from)) {
    store.setGlobalLoading(true)
  }
  await auth.authStateReady()
  if (to.meta.isRequiresAuth && !auth.currentUser) {
    next({ path: '/login' })
    return
  }
  if (auth.currentUser) {
    const idTokenResult = await auth.currentUser.getIdTokenResult()
    if (new Date(idTokenResult.expirationTime) < new Date()) {
      await auth.currentUser.getIdToken(true)
    }
    if (to.name === 'login' || to.name === 'register') {
      next({ path: from.path })
      return
    }
  }
  next()
  store.setGlobalLoading(false)
})

export default router
