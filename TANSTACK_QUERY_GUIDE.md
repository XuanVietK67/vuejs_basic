# TanStack Query Setup Guide

This project is configured with TanStack Query for enterprise-grade data fetching, caching, and state management. Below is a comprehensive guide for using the setup.

## Project Structure

```
src/
├── api/
│   ├── client.ts          # Axios instance with interceptors
│   └── endpoints.ts       # Centralized API endpoint definitions
├── query/
│   ├── config.ts          # QueryClient configuration
│   └── keys.ts            # Query key factory for consistency
├── plugins/
│   └── query.ts           # Vue plugin setup
└── composables/
    ├── useCustomQuery.ts  # Type-safe useQuery wrapper
    ├── useCustomMutation.ts # Type-safe useMutation wrapper
    ├── useAuth.ts         # Auth-related queries and mutations
    ├── useUsers.ts        # User data operations
    ├── useVocab.ts        # Vocabulary operations
    ├── useGame.ts         # Game-related queries
    └── index.ts           # Barrel export file
```

## Configuration

### QueryClient Config ([src/query/config.ts](src/query/config.ts))

Default production settings for all queries and mutations:

- **staleTime**: 5 minutes (data freshness)
- **gcTime**: 10 minutes (garbage collection)
- **retry**: 1 attempt on failure
- **retryDelay**: Exponential backoff (1s → 2s → 4s... max 30s)
- **refetchOnWindowFocus**: Enabled
- **refetchOnMount**: Enabled
- **refetchOnReconnect**: Enabled

Devtools enabled only in development (`import.meta.env.DEV`)

### API Client ([src/api/client.ts](src/api/client.ts))

Configured Axios instance with:

- **Request Interceptors**:
  - Auto-attach Bearer token from localStorage
  - Development request logging
- **Response Interceptors**:
  - Handle 401/403 (auth errors) - clears token and redirects
  - Error logging in development
  - Centralized error handling

- **Base URL**: Configurable via `VITE_API_URL` env variable
- **Timeout**: 10 seconds

### Endpoints ([src/api/endpoints.ts](src/api/endpoints.ts))

Centralized API endpoint management organized by feature:

```typescript
API_ENDPOINTS.AUTH.LOGIN // /auth/login
API_ENDPOINTS.USERS.GET(id) // /users/{id}
API_ENDPOINTS.VOCAB.LIST // /vocab
API_ENDPOINTS.GAME.LEADERBOARD // /game/leaderboard
```

Benefits:

- Single source of truth for all endpoints
- Easy refactoring when API changes
- Type-safe endpoint construction

### Query Keys ([src/query/keys.ts](src/query/keys.ts))

Factory pattern for query key creation:

```typescript
// All auth queries
queryKeys.auth.all

// Current user
queryKeys.auth.me()

// User detail by ID
queryKeys.users.detail(userId)

// Vocabulary list with filters
queryKeys.vocab.list({ category: 'animals' })

// Game leaderboard
queryKeys.game.leaderboard({ limit: 10 })
```

Benefits:

- Consistent key structure
- Hierarchical invalidation support
- Type-safe filtering

## Usage Examples

### Using composables in Vue components

#### Example 1: Fetch User Profile

```vue
<template>
  <div>
    <div v-if="isLoading" class="spinner">Loading...</div>
    <div v-else-if="error" class="error">
      {{ error.response?.data?.message || 'Error loading profile' }}
    </div>
    <div v-else class="user-card">
      <h1>{{ data?.name }}</h1>
      <p>{{ data?.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthUser } from '@/composables'

const { data, isLoading, error } = useAuthUser()
</script>
```

#### Example 2: Form Submission (Mutation)

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData.word" placeholder="Word" />
    <input v-model="formData.definition" placeholder="Definition" />

    <button type="submit" :disabled="isPending" class="btn">
      {{ isPending ? 'Saving...' : 'Save' }}
    </button>

    <p v-if="error" class="error">
      {{ error.response?.data?.message }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCreateVocab, type CreateVocabRequest } from '@/composables'

const formData = ref<CreateVocabRequest>({
  word: '',
  definition: '',
  difficulty: 'medium',
})

const { mutate, isPending, error } = useCreateVocab()

const handleSubmit = () => {
  mutate(formData.value)
}
</script>
```

#### Example 3: Conditional Query Fetching

```vue
<template>
  <div>
    <button @click="userId = userId ? null : '123'">{{ userId ? 'Hide' : 'Show' }} User</button>

    <div v-if="data" class="user">
      <h2>{{ data.name }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '@/composables'

const userId = ref<string | null>(null)

// Query only runs when userId has a value
const { data } = useUser(userId.value || '')
</script>
```

#### Example 4: Pagination

```vue
<template>
  <div>
    <ul>
      <li v-for="user in data?.data" :key="user.id">{{ user.name }}</li>
    </ul>

    <button @click="page--" :disabled="page === 1">Previous</button>
    <span>Page {{ page }}</span>
    <button @click="page++">Next</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUsers } from '@/composables'

const page = ref(1)
const { data, isLoading } = useUsers({ page, limit: 10 })
</script>
```

#### Example 5: Dependent Queries

```vue
<template>
  <div>
    <select v-model="userId">
      <option value="">Select user</option>
      <option v-for="user in users?.data" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <div v-if="userData?.name">
      <h2>{{ userData.name }}</h2>
      <p>{{ userData.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUsers, useUser } from '@/composables'

const userId = ref('')

const { data: users } = useUsers()

// This query only runs when userId is not empty
const { data: userData } = useUser(userId.value)
</script>
```

### Query Invalidation

Manually invalidate queries to force fresh data:

```typescript
import { queryClient } from '@/query/config'
import { queryKeys } from '@/query/keys'

// Invalidate everything
queryClient.invalidateQueries()

// Invalidate all user queries
queryClient.invalidateQueries({ queryKey: queryKeys.users.all })

// Invalidate specific user
queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) })

// Invalidate with filters
queryClient.invalidateQueries({
  queryKey: queryKeys.vocab.lists(),
  exact: false, // also invalidates specific filters
})
```

### Custom Query Configuration

Override default settings for specific queries:

```typescript
import { useCustomQuery } from '@/composables'
import { queryKeys } from '@/query/keys'

// Don't refetch on window focus
const { data } = useCustomQuery(queryKeys.game.stats(), () => fetchStats(), {
  refetchOnWindowFocus: false,
})

// Longer stale time for static data
const { data: categories } = useCustomQuery(['categories'], () => fetchCategories(), {
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
})

// Disable automatic refetch
const { data } = useCustomQuery(queryKeys.users.list(), () => fetchUsers(), {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
})
```

### Error Handling

Mutations automatically handle errors:

```typescript
const { mutate, error, isError } = useLogin()

mutate(
  { email: 'user@example.com', password: 'pass' },
  {
    onSuccess: data => {
      console.log('Login successful:', data)
      // Token already stored in mutation
    },
    onError: error => {
      console.error('Login failed:', error.response?.data?.message)
    },
    onSettled: () => {
      // Called on both success and error
      console.log('Login attempt finished')
    },
  },
)
```

## Environment Variables

Create a `.env.local` file in the project root:

```
VITE_API_URL=http://localhost:3000/api
```

## Development Tools

### TanStack Query Devtools

Devtools are automatically enabled in development. Open with:

- Browser DevTools → Components tab → TanStack Query
- Or use the floating button (if enabled in config)

Features:

- View all queries status
- Inspect cache
- Replay queries
- View mutations
- Network timing

Devtools are automatically disabled in production builds.

## Best Practices

1. **Use Query Keys Factory**: Always use the provided `queryKeys` factory for consistency
2. **Organize by Feature**: Group related composables (useAuth, useUsers, etc.)
3. **Type Everything**: Use provided interfaces (LoginResponse, UserProfile, etc.)
4. **Centralize Endpoints**: Use API_ENDPOINTS for all API calls
5. **Handle Errors**: Always consider error states in UI
6. **Set Appropriate Stale Times**:
   - Frequently changing data: 30s-2m
   - Moderate data: 5-10m
   - Mostly static data: 1+ hour
7. **Use Conditional Queries**: Disable queries with `enabled: !!condition`
8. **Invalidate Strategically**: Only invalidate related queries after mutations
9. **Loading States**: Always show loading indicators during async operations
10. **Error Messages**: Display user-friendly error messages from API

## Devtools in Production

Devtools are completely disabled in production builds:

```typescript
enableDevtoolsV6Plugin: import.meta.env.DEV // Only enabled when DEV is true
```

This ensures zero performance overhead in production.

## Common Patterns

### Reset Form After Mutation Success

```typescript
const { mutate } = useCreateVocab()

mutate(formData.value, {
  onSuccess: () => {
    formData.value = { word: '', definition: '', difficulty: 'medium' }
  },
})
```

### Show Toast on Success/Error

```typescript
import { useToast } from '@/composables' // Your toast composable

const { mutate } = useUpdateUser(userId)

mutate(newData, {
  onSuccess: () => {
    useToast().success('Profile updated!')
  },
  onError: error => {
    useToast().error(error.response?.data?.message || 'Failed to update')
  },
})
```

### Optimistic Updates

```typescript
import { queryClient } from '@/query/config'
import { queryKeys } from '@/query/keys'

const { mutate } = useUpdateUser(userId)

mutate(newData, {
  onMutate: async newData => {
    // Cancel ongoing queries
    await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(userId) })

    // Get previous data
    const previousData = queryClient.getQueryData(queryKeys.users.detail(userId))

    // Optimistically update cache
    queryClient.setQueryData(queryKeys.users.detail(userId), newData)

    return { previousData }
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(queryKeys.users.detail(userId), context?.previousData)
  },
})
```

## Troubleshooting

### Queries not refetching on mount

- Check `refetchOnMount` is not set to `false`
- Verify query key is not changed between renders
- Check `enabled` condition

### Infinite refetch loops

- Verify `queryFn` is stable (use `useCallback` equivalent)
- Check `staleTime` is appropriate
- Ensure `refetchInterval` is not too aggressive

### Memory leaks

- Ensure mutations properly invalidate related queries
- Check query cache settings (`gcTime`)
- Cleanup subscriptions in components

### DevTools not showing in development

- Verify `import.meta.env.DEV` is true
- Check TanStack Query DevTools package is installed
- Hard refresh browser (Ctrl+Shift+R)
