/**
 * API Endpoint definitions
 * Centralized endpoint management for easier refactoring and maintenance
 */

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // User endpoints
  USERS: {
    LIST: '/users',
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    PROFILE: '/users/profile',
  },

  // Vocabulary endpoints
  VOCAB: {
    LIST: '/vocab',
    GET: (id: string) => `/vocab/${id}`,
    CREATE: '/vocab',
    UPDATE: (id: string) => `/vocab/${id}`,
    DELETE: (id: string) => `/vocab/${id}`,
    DAILY: '/vocab/daily',
  },

  // Game endpoints
  GAME: {
    START: '/game/start',
    SUBMIT: '/game/submit',
    LEADERBOARD: '/game/leaderboard',
    STATS: '/game/stats',
  },
} as const
