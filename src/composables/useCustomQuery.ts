import {
  useQuery,
  type UseQueryOptions,
  type UseQueryReturnType,
  type QueryKey,
} from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/api/client'

/**
 * Type-safe wrapper around TanStack Query's useQuery
 * Provides consistent error handling and type support
 *
 * @example
 * const { data, isLoading, error } = useCustomQuery(
 *   queryKeys.users.detail(userId),
 *   () => apiClient.get('/users/' + userId),
 *   { enabled: !!userId }
 * )
 */
export function useCustomQuery<T extends any = unknown, E = AxiosError<ApiErrorResponse>>(
  queryKey: QueryKey,
  queryFn: () => Promise<T> | T,
  options?: Omit<UseQueryOptions<T, E>, 'queryKey' | 'queryFn'>,
): UseQueryReturnType<T, E> {
  return useQuery<T, E>({
    queryKey,
    queryFn: async () => queryFn(),
    ...options,
  })
}
