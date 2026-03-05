<template>
  <section class="bg-linear-to-r from-blue-500 to-purple-600 text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Master New Words Every Day
      </h1>
      <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        Expand your vocabulary with our interactive learning platform. Learn, practice, and retain new words effortlessly.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/game" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
          Get Started Free
        </router-link>
        <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
          Learn More
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed
</script>