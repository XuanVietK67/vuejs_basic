/**
 * Query Key Factory
 * Centralized management of query keys for consistency and easier refactoring
 * Follows TanStack Query best practices
 *
 * Reference: https://tanstack.com/query/latest/docs/react/guides/important-defaults
 */

export const queryKeys = {
  // Auth queries
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
  },

  // User queries
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    profile: () => [...queryKeys.users.all, 'profile'] as const,
  },

  // Vocabulary queries
  vocab: {
    all: ['vocab'] as const,
    lists: () => [...queryKeys.vocab.all, 'list'] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.vocab.lists(), filters] as const,
    details: () => [...queryKeys.vocab.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.vocab.details(), id] as const,
    daily: () => [...queryKeys.vocab.all, 'daily'] as const,
  },

  // Game queries
  game: {
    all: ['game'] as const,
    leaderboard: (filters?: Record<string, any>) =>
      [...queryKeys.game.all, 'leaderboard', filters] as const,
    stats: () => [...queryKeys.game.all, 'stats'] as const,
    gameSession: (id: string) => [...queryKeys.game.all, 'session', id] as const,
  },
} as const
