<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema, type RegisterInput } from '../schemas/register.schema'

import { useRouter } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import { computed } from 'vue'

const router = useRouter()

/* 🎯 form setup */
const { handleSubmit, defineField, errors, isSubmitting, values } = useForm<RegisterInput>({
  validationSchema: toTypedSchema(registerSchema),
})

const isDisabled = computed(() => {
  return isSubmitting.value || !values.acceptTerms
})

/* 🎯 bind fields */
const [name, nameAttrs] = defineField('name', {
  validateOnBlur: true,
})

const [email, emailAttrs] = defineField('email', {
  validateOnBlur: true,
})

const [password, passwordAttrs] = defineField('password', {
  validateOnBlur: true,
})

const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword', {
  validateOnBlur: true,
})

const [accessTerm, accessTermAttrs] = defineField('acceptTerms', {
  validateOnBlur: true,
})

/* 🎯 submit */
const onSubmit = handleSubmit(async values => {
  console.log(values) // fully typed 🎉

  await new Promise(r => setTimeout(r, 1000))

  router.push('/')
})
</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-semibold">Create account</h2>
      <p class="text-sm text-gray-500">Start your journey with us</p>
    </div>

    <form class="space-y-4" @submit="onSubmit">
      <!-- Name -->
      <div>
        <Input
          label="Full name"
          v-model="name"
          v-bind="nameAttrs"
          placeholder="Alexandra"
          :error="errors.name"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <Input
          label="Email"
          type="email"
          v-model="email"
          v-bind="emailAttrs"
          placeholder="you@example.com"
          :error="errors.email "
          required
        />
      </div>

      <!-- Password -->
      <div>
        <Input
          label="Password"
          type="password"
          v-model="password"
          v-bind="passwordAttrs"
          placeholder="******"
          :error="errors.password"
          required
        />
      </div>

      <!-- Confirm password -->
      <div>
        <Input
          label="Confirm password"
          type="password"
          v-model="confirmPassword"
          v-bind="confirmPasswordAttrs"
          placeholder="******"
          :error="errors.confirmPassword"
          required
        />
      </div>

      <!-- Terms -->

      <div class="flex items-start gap-2 text-sm">
        <input type="checkbox" v-model="accessTerm" v-bind="accessTermAttrs" class="mt-1" />

        <label>
          I agree to the
          <a href="#" class="text-blue-600 underline">Terms of Service</a>
          and
          <a href="#" class="text-blue-600 underline">Privacy Policy</a>
        </label>
      </div>

      <p class="text-sm text-red-500 mt-1">{{ errors.acceptTerms }}</p>

      <Button
        :disabled="isDisabled"
        class="w-full h-11 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        Create account
      </Button>
    </form>

    <p class="text-center text-sm text-gray-500">
      Already have an account?
      <RouterLink to="/login" class="text-blue-600 font-medium hover:underline">
        Sign in
      </RouterLink>
    </p>
  </div>
</template>
