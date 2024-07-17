import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { isUserLoggedIn } from './utils'

// Tambahkan log untuk memeriksa rute yang dihasilkan


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        const isLoggedIn = isUserLoggedIn()

        console.log('Redirecting from root, user logged in:', isLoggedIn)

        return isLoggedIn ? { name: 'index' } : { name: 'login', query: to.query }
      },
    },
    ...setupLayouts(routes),
  ],
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn()

  // Redirect if not logged in and trying to access a protected route
  if (!isLoggedIn && to.meta.requiresAuth) {
    console.log('Redirecting to login because user is not logged in')
    
    return next({ name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } })
  }

  next()
})

export default router
