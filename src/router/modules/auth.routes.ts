import AuthLayout from '@/layouts/authLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
    //   {
    //     path: '',
    //     name: 'login',
    //     component: () => import('@/views/auth/LoginView.vue'),
    //   },
    {
        path:'register',
        name:'register',
        component: () => import('@/features/auth/pages/RegisterPage.vue'),
    }
    ],
  },
]

export default routes