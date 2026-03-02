import type { Router } from 'vue-router'

export function setupGuards(router: Router) {
  router.beforeEach(to => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth && !token) {
      return '/login'
    }
  })
}