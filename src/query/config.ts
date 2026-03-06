import { QueryClient } from '@tanstack/vue-query'
import type { DefaultOptions } from '@tanstack/vue-query'

/**
 * Query client default options for production
 * These settings balance between data freshness and network efficiency
 */
const queryConfig: DefaultOptions = {
  queries: {
    // Time in milliseconds before a query becomes stale (5 minutes)
    staleTime: 5 * 60 * 1000,

    // Time in milliseconds data can be garbage collected (10 minutes)
    gcTime: 10 * 60 * 1000,

    // Number of times failed query will retry before showing error
    retry: 1,

    // Delay in milliseconds between retries (exponential backoff)
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),

    // Whether to refetch on window focus
    refetchOnWindowFocus: true,

    // Whether to refetch on mount
    refetchOnMount: true,

    // Whether to refetch when network is reconnected
    refetchOnReconnect: true,
  },

  mutations: {
    // Number of times failed mutation will retry
    retry: 1,

    // Delay between retries for mutations (exponential backoff)
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
}

/**
 * Create and configure QueryClient
 */
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: queryConfig,
  })
}

export const queryClient = createQueryClient()
