<script setup lang="ts">
type Provider = "google" | "facebook" | "apple" | "github"

const props = defineProps<{
  provider: Provider
}>()

const emit = defineEmits(["click"])

const map = {
  google: {
    icon: "/icons/google.svg",
    class: "hover:bg-slate-100",
  },
  facebook: {
    icon: "/icons/facebook.svg",
    class: "hover:bg-blue-50",
  },
  apple: {
    icon: "/icons/apple.svg",
    class: "hover:bg-slate-100",
  },
  github: {
    icon: "/icons/github.svg",
    class: "hover:bg-slate-100",
  },
}
</script>

<template>
  <button
    @click="emit('click')"
    class="
      h-12 rounded-xl
      flex items-center justify-center
      bg-slate-100
      transition
      active:scale-95
      shadow-sm
    "
    :class="map[provider].class"
  >
    <img :src="map[provider].icon" class="w-5 h-5" />
  </button>
</template>