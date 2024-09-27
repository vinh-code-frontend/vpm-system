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
      },
      children: [
        {
          path: '/user/:userId',
          name: 'user',
          component: () => import('../views/User/YourProfile.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('../views/User/UserSetting.vue')
        },
        {
          path: '/user-management',
          name: 'user-management',
          component: () => import('../views/Setting/UserManagement/UserManagement.vue')
        }
      ]
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
  const user = auth.currentUser
  if (to.meta.isRequiresAuth && !user) {
    next({ path: '/login' })
    return
  }
  if (user) {
    const idTokenResult = await user.getIdTokenResult()
    if (new Date(idTokenResult.expirationTime) < new Date()) {
      await user.getIdToken(true)
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
