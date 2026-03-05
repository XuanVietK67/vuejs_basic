<template>
  <section id="vocabulary" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Today's Vocabulary
        </h2>
        <p class="text-xl text-gray-600">
          Preview some words you'll learn today
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition duration-300">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Ephemeral</h3>
          <p class="text-gray-600 mb-3">/ɪˈfemərəl/</p>
          <p class="text-sm text-gray-700">Lasting for a very short time.</p>
          <p class="text-sm text-gray-500 mt-2 italic">"The beauty of cherry blossoms is ephemeral."</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition duration-300">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Ubiquitous</h3>
          <p class="text-gray-600 mb-3">/juːˈbɪkwɪtəs/</p>
          <p class="text-sm text-gray-700">Present, appearing, or found everywhere.</p>
          <p class="text-sm text-gray-500 mt-2 italic">"Smartphones have become ubiquitous in modern society."</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition duration-300">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Resilient</h3>
          <p class="text-gray-600 mb-3">/rɪˈzɪliənt/</p>
          <p class="text-sm text-gray-700">Able to recover quickly from difficulties.</p>
          <p class="text-sm text-gray-500 mt-2 italic">"Children are often more resilient than adults."</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition duration-300">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Meticulous</h3>
          <p class="text-gray-600 mb-3">/məˈtɪkjələs/</p>
          <p class="text-sm text-gray-700">Showing great attention to detail.</p>
          <p class="text-sm text-gray-500 mt-2 italic">"She was meticulous in her research work."</p>
        </div>
      </div>
      <div class="text-center mt-12">
        <router-link to="/auth/register" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
          Start Learning Today
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed
</script>