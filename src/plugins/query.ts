import type { App } from 'vue'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { queryClient } from '@/query/config'

/**
 * Setup TanStack Query Vue plugin with production best practices
 * Devtools only enabled in development environment
 */
export function setupQueryPlugin(app: App) {
  const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClient,
    enableDevtoolsV6Plugin: import.meta.env.DEV,
  }

  app.use(VueQueryPlugin, vueQueryPluginOptions)
}
