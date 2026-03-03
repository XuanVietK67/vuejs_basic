<script setup lang="ts">
defineEmits(["click"])
</script>

<template>
  <button
    @click="$emit('click')"
    class="
      w-full h-11 rounded-xl
      bg-slate-100
      hover:bg-slate-200
      text-slate-800
      flex items-center justify-center gap-2
      font-medium
      transition
    "
  >
    <span class="text-lg">🔑</span>
    <span>Sign in with passkey</span>
  </button>
</template>