<template>
  <div class="min-h-screen">
    <Navbar />
    <Hero />
    <FeatureCards />
    <DailyVocab />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/home/Navbar.vue'
import Hero from '@/components/home/Hero.vue'
import FeatureCards from '@/components/home/FeatureCards.vue'
import DailyVocab from '@/components/home/DailyVocab.vue'
import Footer from '@/components/home/Footer.vue'
</script>