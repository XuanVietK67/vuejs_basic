import AuthLayout from '@/layouts/authLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/features/auth/pages/LoginPage.vue'),
      },
    {
        path:'register',
        name:'register',
        component: () => import('@/features/auth/pages/RegisterPage.vue'),
    }
    ],
  },
]

export default routes