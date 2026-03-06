import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/api/client'
import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import { queryKeys } from '@/query/keys'
import { useCustomQuery, useCustomMutation } from '@/composables'
import { queryClient } from '@/query/config'

export interface VocabItem {
  id: string
  word: string
  definition: string
  example?: string
  category?: string
  difficulty: 'easy' | 'medium' | 'hard'
  createdAt: string
}

export interface CreateVocabRequest {
  word: string
  definition: string
  example?: string
  category?: string
  difficulty: 'easy' | 'medium' | 'hard'
}

/**
 * Hook for fetching vocabulary list with pagination
 */
export function useVocabList(filters?: { page?: number; limit?: number; category?: string }) {
  return useCustomQuery(
    queryKeys.vocab.list(filters),
    () =>
      apiClient
        .get<{ data: VocabItem[]; total: number }>(API_ENDPOINTS.VOCAB.LIST, {
          params: filters,
        })
        .then(res => res.data),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
  )
}

/**
 * Hook for fetching daily vocabulary
 * Returns a curated list of vocabulary for the day
 */
export function useDailyVocab() {
  return useCustomQuery(
    queryKeys.vocab.daily(),
    () => apiClient.get<VocabItem[]>(API_ENDPOINTS.VOCAB.DAILY).then(res => res.data),
    {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      refetchOnWindowFocus: false,
    },
  )
}

/**
 * Hook for fetching a single vocabulary item
 */
export function useVocab(vocabId: string) {
  return useCustomQuery(
    queryKeys.vocab.detail(vocabId),
    () => apiClient.get<VocabItem>(API_ENDPOINTS.VOCAB.GET(vocabId)).then(res => res.data),
    {
      enabled: !!vocabId,
    },
  )
}

/**
 * Hook for creating new vocabulary item
 */
export function useCreateVocab() {
  return useCustomMutation(
    (vocabulary: CreateVocabRequest) =>
      apiClient.post<VocabItem>(API_ENDPOINTS.VOCAB.CREATE, vocabulary).then(res => res.data),
    {
      onSuccess: () => {
        // Invalidate vocabulary lists
        queryClient.invalidateQueries({ queryKey: queryKeys.vocab.lists() })
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        console.error('Failed to create vocabulary:', error.response?.data?.message)
      },
    },
  )
}

/**
 * Hook for updating vocabulary item
 */
export function useUpdateVocab(vocabId: string) {
  return useCustomMutation(
    (data: Partial<CreateVocabRequest>) =>
      apiClient.put<VocabItem>(API_ENDPOINTS.VOCAB.UPDATE(vocabId), data).then(res => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.vocab.detail(vocabId) })
        queryClient.invalidateQueries({ queryKey: queryKeys.vocab.lists() })
      },
    },
  )
}

/**
 * Hook for deleting vocabulary item
 */
export function useDeleteVocab() {
  return useCustomMutation(
    (vocabId: string) => apiClient.delete(API_ENDPOINTS.VOCAB.DELETE(vocabId)).then(() => vocabId),
    {
      onSuccess: (vocabId: string) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.vocab.detail(vocabId) })
        queryClient.invalidateQueries({ queryKey: queryKeys.vocab.lists() })
      },
    },
  )
}
