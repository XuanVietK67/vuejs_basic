<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-1">
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1"> * </span>
    </label>

    <input
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      class="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:outline-none transition"
      :class="error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
    />

    <p v-if="error" class="text-sm text-red-500">
      {{ error }}
    </p>
  </div>
</template>
