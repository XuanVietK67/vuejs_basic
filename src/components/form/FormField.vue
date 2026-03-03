<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  name: string
}>()

const { value, errorMessage, handleChange, handleBlur } = useField(props.name)
</script>

<template>
  <slot
    :field="{
      modelValue: value,
      'onUpdate:modelValue': handleChange,
      onBlur: handleBlur,
    }"
    :error="errorMessage"
  />
</template>
