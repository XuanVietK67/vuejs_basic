# TanStack Query Setup - Quick Start

## What Was Installed

✅ **@tanstack/vue-query** - Vue 3 data fetching library
✅ **axios** - HTTP client for API calls

## What Was Created

### Core Setup (Production Ready)

- `src/api/client.ts` - Axios instance with request/response interceptors
- `src/api/endpoints.ts` - Centralized API endpoint definitions
- `src/query/config.ts` - QueryClient configuration with optimal defaults
- `src/query/keys.ts` - Query key factory for cache management
- `src/plugins/query.ts` - Vue plugin initialization
- `src/main.ts` - Updated to include query plugin

### Reusable Composables (Type-Safe)

- `src/composables/useCustomQuery.ts` - Wrapper around useQuery
- `src/composables/useCustomMutation.ts` - Wrapper around useMutation
- `src/composables/useAuth.ts` - Login, logout, register, profile
- `src/composables/useUsers.ts` - User CRUD operations
- `src/composables/useVocab.ts` - Vocabulary management
- `src/composables/useGame.ts` - Game operations & leaderboard
- `src/composables/index.ts` - Barrel exports for clean imports

### Documentation & Config

- `TANSTACK_QUERY_GUIDE.md` - Comprehensive usage guide with examples
- `.env.example` - Environment variable template

## Quick Start

### 1. Setup Environment Variables

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your API URL
VITE_API_URL=http://localhost:3000/api
```

### 2. Use in Components

**Query Example:**

```vue
<script setup lang="ts">
import { useAuthUser } from '@/composables'

const { data: user, isLoading, error } = useAuthUser()
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>{{ user?.name }}</div>
</template>
```

**Mutation Example:**

```vue
<script setup lang="ts">
import { useLogin } from '@/composables'

const { mutate, isPending } = useLogin()

const handleLogin = () => {
  mutate({ email: 'user@example.com', password: 'pass' })
}
</script>

<template>
  <button @click="handleLogin" :disabled="isPending">
    {{ isPending ? 'Logging in...' : 'Login' }}
  </button>
</template>
```

### 3. Available Composables

**Auth:**

- `useAuthUser()` - Current user profile
- `useLogin()` - Login mutation
- `useLogout()` - Logout mutation
- `useRegister()` - Registration mutation

**Users:**

- `useUsers(filters?)` - List users with pagination
- `useUser(userId)` - Single user details
- `useUpdateUser(userId)` - Update user mutation
- `useDeleteUser()` - Delete user mutation

**Vocabulary:**

- `useVocabList(filters?)` - Vocabulary list with pagination
- `useDailyVocab()` - Daily curated vocabulary
- `useVocab(id)` - Single vocabulary item
- `useCreateVocab()` - Create mutation
- `useUpdateVocab(id)` - Update mutation
- `useDeleteVocab()` - Delete mutation

**Game:**

- `useLeaderboard(limit?)` - Top players
- `useGameStats(userId)` - Player statistics
- `useStartGame()` - Start new game session
- `useSubmitGameAnswers()` - Submit answers mutation

## Key Features

✅ **Type-Safe** - Full TypeScript support with interfaces
✅ **Auto-Auth** - Bearer token automatically attached to requests
✅ **Error Handling** - Centralized error handling & logging
✅ **Smart Caching** - Configurable stale times & garbage collection
✅ **DevTools** - Enabled in dev, disabled in production
✅ **Scalable** - Clean folder structure for growing teams
✅ **Reactive** - Automatic refetch on window focus, mount, reconnect
✅ **Query Invalidation** - Smart cache busting after mutations

## Folder Structure

```
src/
├── api/                    # API layer
│   ├── client.ts          # Axios instance
│   └── endpoints.ts       # Endpoint definitions
├── query/                  # Query management
│   ├── config.ts          # QueryClient config
│   └── keys.ts            # Query key factory
├── plugins/                # Vue plugins
│   └── query.ts           # Query plugin setup
└── composables/           # Reusable composables
    ├── useCustomQuery.ts
    ├── useCustomMutation.ts
    ├── useAuth.ts
    ├── useUsers.ts
    ├── useVocab.ts
    ├── useGame.ts
    └── index.ts
```

## Configuration Highlights

**QueryClient Defaults:**

- `staleTime`: 5 minutes
- `gcTime`: 10 minutes
- `retry`: 1 attempt
- `retryDelay`: Exponential backoff

**API Client:**

- Auto-attached Bearer token from localStorage
- 401/403 error handling (logout & redirect)
- 10-second request timeout
- Development logging

**DevTools:**

- Automatically enabled in development
- Completely disabled in production builds

## Next Steps

1. Read [TANSTACK_QUERY_GUIDE.md](TANSTACK_QUERY_GUIDE.md) for detailed usage patterns
2. Update `API_ENDPOINTS` in `src/api/endpoints.ts` with your actual backend URLs
3. Configure `VITE_API_URL` in `.env.local`
4. Start using composables in your Vue components
5. Customize error handling in `src/api/client.ts` if needed

## Common Tasks

### Fetch Data

```typescript
const { data, isLoading, error } = useAuthUser()
```

### Submit Form

```typescript
const { mutate, isPending } = useCreateVocab()
mutate({ word: 'hello', definition: '...', difficulty: 'easy' })
```

### Refresh Data

```typescript
import { queryClient } from '@/query/config'
import { queryKeys } from '@/query/keys'

queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
```

### Conditional Queries

```typescript
const userId = ref<string | null>(null)
const { data } = useUser(userId.value || '') // Only runs when userId is set
```

## Production Checklist

- [ ] Set `VITE_API_URL` to production API URL
- [ ] Remove development logging (or use proper logger)
- [ ] Test error handling & auth flows
- [ ] Verify DevTools are disabled in production build
- [ ] Configure appropriate stale times for your data
- [ ] Test mutation error cases
- [ ] Setup proper error boundaries in Vue
- [ ] Consider retry strategies for critical operations

## Support & Documentation

For detailed information, see [TANSTACK_QUERY_GUIDE.md](TANSTACK_QUERY_GUIDE.md) which covers:

- Complete API reference
- Advanced patterns (optimistic updates, dependent queries, etc.)
- Error handling strategies
- Troubleshooting guide
- Best practices for teams
