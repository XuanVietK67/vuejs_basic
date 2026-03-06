import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/api/client'
import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import { queryKeys } from '@/query/keys'
import { useCustomQuery, useCustomMutation } from '@/composables'
import { queryClient } from '@/query/config'

export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  avatar?: string
}

/**
 * Hook for fetching all users (paginated)
 */
export function useUsers(filters?: { page?: number; limit?: number }) {
  return useCustomQuery(
    queryKeys.users.list(filters),
    () =>
      apiClient.get<{ data: UserProfile[]; total: number }>(API_ENDPOINTS.USERS.LIST, {
        params: filters,
      }),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  )
}

/**
 * Hook for fetching a single user by ID
 */
export function useUser(userId: string) {
  return useCustomQuery(
    queryKeys.users.detail(userId),
    () => apiClient.get<UserProfile>(API_ENDPOINTS.USERS.GET(userId)).then(res => res.data),
    {
      enabled: !!userId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
  )
}

/**
 * Hook for updating user profile
 */
export function useUpdateUser(userId: string) {
  return useCustomMutation(
    (data: UpdateUserRequest) =>
      apiClient.put<UserProfile>(API_ENDPOINTS.USERS.UPDATE(userId), data).then(res => res.data),
    {
      onSuccess: (_data: UserProfile) => {
        // Invalidate related queries
        queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })
        queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
        queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile() })
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        console.error('Failed to update user:', error.response?.data?.message)
      },
    },
  )
}

/**
 * Hook for deleting a user
 */
export function useDeleteUser() {
  return useCustomMutation(
    (userId: string) => apiClient.delete(API_ENDPOINTS.USERS.DELETE(userId)).then(() => userId),
    {
      onSuccess: (userId: string) => {
        // Invalidate user queries
        queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })
        queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() })
      },
    },
  )
}
