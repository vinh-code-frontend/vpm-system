import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layout/DashboardLayout.vue'
import { auth } from '@/firebase'
import { useNProgress } from '@/hooks/useNProgress'

const { start, done } = useNProgress()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardLayout,
      meta: {
        isRequiresAuth: true,
        title: 'Home'
      },
      redirect: () => {
        return { path: '/overview' }
      },
      children: [
        {
          path: '/overview',
          name: 'overview',
          meta: {
            title: 'Overview'
          },
          component: () => import('../views/Setting/OverviewView.vue')
        },
        {
          path: '/user/:userId',
          name: 'user',
          meta: {
            title: 'User'
          },
          component: () => import('../views/User/UserProfile.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          meta: {
            title: 'Settings'
          },
          component: () => import('../views/User/UserSetting.vue')
        },
        {
          path: '/user-management',
          name: 'user-management',
          meta: {
            title: 'User Management'
          },
          component: () => import('../views/Setting/UserManagement.vue')
        },
        {
          path: '/log-work',
          name: 'log-work',
          meta: {
            title: 'Log work'
          },
          component: () => import('../views/Setting/LogWork.vue')
        },
        {
          path: '/workplace',
          name: 'workplace',
          meta: {
            title: 'Workplace'
          },
          component: () => import('../views/Setting/Workplace/WorkplaceView.vue')
        },
        {
          path: '/property-management',
          name: 'property-management',
          meta: {
            title: 'Property Management'
          },
          component: () => import('../views/Setting/PropertyManagement/PropertyManagement.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: () => import('@/views/Auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: 'Register'
      },
      component: () => import('@/views/Auth/RegisterView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { path: '/' }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  start()
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
})

router.afterEach(() => {
  done()
})

export default router
