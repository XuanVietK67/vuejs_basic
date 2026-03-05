<template>
  <section id="features" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Choose Our Platform?
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the features that make learning vocabulary engaging and effective.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
          :icon-class="feature.iconClass"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FeatureCard from './FeatureCard.vue';

interface Feature {
  title: string;
  description: string;
  icon: string;
  iconClass: string;
}

const features: Feature[] = [
  {
    title: 'Daily Vocabulary',
    description: 'Get curated words delivered to you every day with contextual examples and pronunciation guides.',
    icon: `<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
    </svg>`,
    iconClass: 'bg-blue-100',
  },
  {
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with engaging quizzes and track your progress over time.',
    icon: `<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`,
    iconClass: 'bg-green-100',
  },
  {
    title: 'Spaced Repetition',
    description: 'Our algorithm optimizes your learning by showing words at the perfect intervals for retention.',
    icon: `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>`,
    iconClass: 'bg-purple-100',
  },
];
</script>