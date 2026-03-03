<script setup lang="ts">
import SocialLoginButton from '@/features/auth/components/SocialLoginButton.vue'
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <SocialLoginButton provider="apple" />
    <SocialLoginButton provider="facebook" />
    <SocialLoginButton provider="google" />
  </div>
</template>
