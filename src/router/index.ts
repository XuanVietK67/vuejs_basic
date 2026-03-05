import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/features/auth/routes/auth.routes'
import { setupGuards } from '@/router/guard'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    ...authRoutes,
  ],
  scrollBehavior: () => ({ top: 0 }),
})

setupGuards(router)

export default router