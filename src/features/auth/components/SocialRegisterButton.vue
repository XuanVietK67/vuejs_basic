<script setup lang="ts">
const emit = defineEmits(['google', 'github', 'facebook'])
</script>

<template>
  <div class="space-y-3">
    <!-- Google -->
    <button
      @click="emit('google')"
      class="w-full h-11 rounded-xl border flex items-center justify-center gap-3 hover:bg-gray-50 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        class="w-5 h-5"
      />
      Continue with Google
    </button>
  </div>
</template>