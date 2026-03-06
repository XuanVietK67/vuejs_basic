import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/api/client'
import { apiClient } from '@/api/client'
import { API_ENDPOINTS } from '@/api/endpoints'
import { queryKeys } from '@/query/keys'
import { useCustomQuery, useCustomMutation } from '@/composables'
import { queryClient } from '@/query/config'

export interface GameSession {
  id: string
  userId: string
  startedAt: string
  endedAt?: string
  score: number
  correctAnswers: number
  totalQuestions: number
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  userName: string
  totalScore: number
  gamesPlayed: number
  averageAccuracy: number
}

export interface GameStats {
  totalGames: number
  totalScore: number
  averageAccuracy: number
  bestStreak: number
}

/**
 * Hook for fetching game leaderboard
 */
export function useLeaderboard(limit: number = 10) {
  return useCustomQuery(
    queryKeys.game.leaderboard({ limit }),
    () =>
      apiClient
        .get<LeaderboardEntry[]>(API_ENDPOINTS.GAME.LEADERBOARD, {
          params: { limit },
        })
        .then(res => res.data),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 60 * 1000, // Refetch every minute
    },
  )
}

/**
 * Hook for fetching user's game statistics
 */
export function useGameStats(userId: string) {
  return useCustomQuery(
    queryKeys.game.stats(),
    () => apiClient.get<GameStats>(API_ENDPOINTS.GAME.STATS).then(res => res.data),
    {
      enabled: !!userId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
  )
}

/**
 * Hook for starting a new game session
 */
export function useStartGame() {
  return useCustomMutation(
    (difficulty?: 'easy' | 'medium' | 'hard') =>
      apiClient.post<GameSession>(API_ENDPOINTS.GAME.START, { difficulty }).then(res => res.data),
    {
      onSuccess: () => {
        // Invalidate game stats when new game starts
        queryClient.invalidateQueries({ queryKey: queryKeys.game.stats() })
      },
    },
  )
}

/**
 * Hook for submitting game answers
 */
export function useSubmitGameAnswers() {
  return useCustomMutation(
    (data: { sessionId: string; answers: Array<{ questionId: string; answer: string }> }) =>
      apiClient.post<GameSession>(API_ENDPOINTS.GAME.SUBMIT, data).then(res => res.data),
    {
      onSuccess: () => {
        // Invalidate leaderboard and stats
        queryClient.invalidateQueries({ queryKey: queryKeys.game.leaderboard() })
        queryClient.invalidateQueries({ queryKey: queryKeys.game.stats() })
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        console.error('Failed to submit game answers:', error.response?.data?.message)
      },
    },
  )
}
