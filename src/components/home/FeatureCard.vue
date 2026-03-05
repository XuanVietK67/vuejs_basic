<template>
  <div
    class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
    :class="className"
  >
    <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4" :class="iconClass">
      <div v-html="icon"></div>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
    <a v-if="link" :href="link" class="text-blue-600 hover:text-blue-800 mt-2 inline-block"
      >Learn more</a
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: string
  iconClass?: string
  className?: string
  link?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconClass: 'bg-blue-100',
  className: '',
  link: '',
})
</script>
