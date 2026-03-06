import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/api/client'
import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import { queryKeys } from '@/query/keys'
import { queryClient } from '@/query/config'
import { useCustomQuery } from '@/composables/useCustomQuery'
import { useCustomMutation } from '@/composables/useCustomMutation'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export interface User {
  id: string
  email: string
  name: string
}

/**
 * Hook for fetching current authenticated user profile
 * Auto-disabled if no token is present
 */
export function useAuthUser() {
  const hasToken = !!localStorage.getItem('authToken')

  return useCustomQuery(
    queryKeys.auth.me(),
    () => apiClient.get<User>(API_ENDPOINTS.AUTH.ME).then(res => res.data),
    {
      enabled: hasToken,
      retry: false,
    },
  )
}

/**
 * Hook for user login mutation
 * Automatically invalidates user queries on success
 */
export function useLogin() {
  return useCustomMutation(
    (credentials: LoginRequest) =>
      apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials).then(res => res.data),
    {
      onSuccess: (data: LoginResponse) => {
        // Store auth token
        localStorage.setItem('authToken', data.token)

        // Invalidate auth queries to refetch user data
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        console.error('Login failed:', error.response?.data?.message)
      },
    },
  )
}

/**
 * Hook for user logout mutation
 * Clears auth state and invalidates all queries
 */
export function useLogout() {
  return useCustomMutation(() => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT), {
    onSuccess: () => {
      // Clear auth token
      localStorage.removeItem('authToken')

      // Clear all queries
      queryClient.clear()
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error('Logout failed:', error.response?.data?.message)
    },
  })
}

/**
 * Hook for user registration
 */
export function useRegister() {
  return useCustomMutation(
    (data: LoginRequest & { name: string }) =>
      apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, data).then(res => res.data),
    {
      onSuccess: (data: LoginResponse) => {
        localStorage.setItem('authToken', data.token)
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
      },
    },
  )
}
