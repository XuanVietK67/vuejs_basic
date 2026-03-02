import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/features/auth/routes/auth.routes'
import { setupGuards } from '@/router/guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [...authRoutes],
  scrollBehavior: () => ({ top: 0 }),
})

setupGuards(router)

export default router