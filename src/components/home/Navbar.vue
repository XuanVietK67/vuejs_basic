<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="shrink-0">
            <h1 class="text-xl font-bold text-gray-800">VocabApp</h1>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <a href="#features" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</a>
          <a href="#vocabulary" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Vocabulary</a>
          <router-link to="/auth/login" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
          <router-link to="/auth/register" class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Sign Up</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// No script needed for now
</script>