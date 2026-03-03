<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerSchema, type RegisterInput } from '../schemas/register.schema'

import { useRouter } from 'vue-router'
import Input from '@/components/ui/Input.vue'
import { computed } from 'vue'
import SocialLoginButton from '@/features/auth/components/SocialLoginButton.vue'
import PasskeyButton from '@/features/auth/components/PasskeyButton.vue'
import SocialGrid from '@/features/auth/components/SocialGrid.vue'

function loginWithGoogle() {
  window.location.href = '/api/auth/google'
}

function loginWithGithub() {
  window.location.href = '/api/auth/github'
}

const router = useRouter()

/* 🎯 form setup */
const { handleSubmit, defineField, errors, isSubmitting, values } = useForm<RegisterInput>({
  validationSchema: toTypedSchema(registerSchema),
})

const isDisabled = computed(() => {
  return isSubmitting.value || !values.acceptTerms
})

/* 🎯 bind fields */

const [email, emailAttrs] = defineField('email', {
  validateOnBlur: true,
})

const [password, passwordAttrs] = defineField('password', {
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
  <!-- Social -->

  <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-4">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-semibold">Create account</h2>
      <p class="text-sm text-gray-500">Start your journey with us</p>
    </div>

    <form class="space-y-4" @submit="onSubmit">
      <!-- Email -->
      <div>
        <Input
          label="Email"
          type="email"
          v-model="email"
          v-bind="emailAttrs"
          placeholder="you@example.com"
          :error="errors.email"
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
    </form>
    <!-- Divider -->
    <!-- <div class="relative text-center text-sm text-gray-400 my-5">
      <span class="bg-white px-3 relative z-10">or continue with email</span>
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t"></div>
      </div>
    </div> -->

    <!-- <SocialRegisterButton @google="loginWithGoogle" @github="loginWithGithub" /> -->
    <!-- divider -->
    <div class="flex items-center gap-3 text-xs text-slate-400">
      <div class="h-px bg-slate-200 flex-1" />
      or
      <div class="h-px bg-slate-200 flex-1" />
    </div>

    <!-- passkey -->
    <PasskeyButton />

    <!-- social grid -->
    <SocialGrid />

    <p class="text-center text-sm text-gray-500">
      You don't have an account?
      <RouterLink to="/auth/register" class="text-blue-600 font-medium hover:underline">
        Register here !
      </RouterLink>
    </p>
  </div>
</template>
