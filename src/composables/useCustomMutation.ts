import {
  useMutation,
  type UseMutationOptions,
  type UseMutationReturnType,
} from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/api/client'

/**
 * Type-safe wrapper around TanStack Query's useMutation
 * Provides consistent error handling and type support
 *
 * @example
 * const { mutate, isPending, error } = useCustomMutation(
 *   (data) => apiClient.post('/users', data),
 *   {
 *     onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
 *     onError: (error) => console.error(error.response?.data?.message),
 *   }
 * )
 */
export function useCustomMutation<
  TData = unknown,
  TError = AxiosError<ApiErrorResponse>,
  TVariables = unknown,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationReturnType<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async variables => mutationFn(variables),
    ...options,
  })
}
