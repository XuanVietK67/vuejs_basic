import axios, { type AxiosInstance, AxiosError } from 'axios'

export interface ApiErrorResponse {
  message: string
  code?: string
  errors?: Record<string, string[]>
}

/**
 * Create and configure Axios instance with production best practices
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  /**
   * Request interceptor - for auth tokens, logging, etc.
   */
  client.interceptors.request.use(
    config => {
      // Add auth token if available
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // Add request logging in development
      if (import.meta.env.DEV) {
        console.debug(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
      }

      return config
    },
    error => {
      return Promise.reject(error)
    },
  )

  /**
   * Response interceptor - for error handling, token refresh, etc.
   */
  client.interceptors.response.use(
    response => {
      if (import.meta.env.DEV) {
        console.debug(`[API Response] ${response.status} ${response.config.url}`)
      }
      return response
    },
    (error: AxiosError<ApiErrorResponse>) => {
      // Handle auth errors (401, 403)
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Clear auth token and redirect to login
        localStorage.removeItem('authToken')
        window.location.href = '/login'
      }

      // Log errors in development
      if (import.meta.env.DEV) {
        console.error(`[API Error] ${error.response?.status} ${error.config?.url}`, {
          message: error.response?.data?.message || error.message,
          data: error.response?.data,
        })
      }

      return Promise.reject(error)
    },
  )

  return client
}

export const apiClient = createApiClient()
