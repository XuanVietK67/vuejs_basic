<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <!-- Header -->
    <header class="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="text-white hover:text-white/80 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <h1 class="text-xl font-bold text-white">Vocabulary Learning</h1>
          </div>
          <div class="text-white text-sm">
            {{ currentCardIndex + 1 }} / {{ vocabulary.length }}
          </div>
        </div>
      </div>
    </header>

    <!-- Progress Bar -->
    <div class="max-w-4xl mx-auto px-4 py-4">
      <div class="bg-white/20 rounded-full h-2">
        <div
          class="bg-white h-2 rounded-full transition-all duration-300"
          :style="{ width: `${((currentCardIndex + 1) / vocabulary.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Main Game Area -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Mode Selection (if not started) -->
      <div v-if="!gameStarted" class="text-center">
        <h2 class="text-3xl font-bold text-white mb-8">Choose Your Learning Mode</h2>
        <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            @click="startGame('english-to-vietnamese')"
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
          >
            <div class="text-2xl mb-4">🇺🇸 → 🇻🇳</div>
            <h3 class="text-xl font-bold text-white mb-2">English to Vietnamese</h3>
            <p class="text-white/80">See English words, guess Vietnamese meanings</p>
          </button>
          <button
            @click="startGame('vietnamese-to-english')"
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
          >
            <div class="text-2xl mb-4">🇻🇳 → 🇺🇸</div>
            <h3 class="text-xl font-bold text-white mb-2">Vietnamese to English</h3>
            <p class="text-white/80">See Vietnamese meanings, guess English words</p>
          </button>
        </div>
      </div>

      <!-- Flashcard Game -->
      <div v-else class="space-y-8">
        <!-- Current Card -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div class="text-center">
            <!-- Question Side -->
            <div v-if="!showAnswer" class="space-y-6">
              <div class="text-4xl mb-4">
                <img
                  v-if="currentCard.image"
                  :src="currentCard.image"
                  :alt="currentCard.question"
                  class="w-20 h-20 mx-auto mb-4 object-contain"
                />
              </div>
              <h3 class="text-3xl font-bold text-white mb-4">{{ currentCard.question }}</h3>
              <p class="text-white/80 text-lg">What does this mean?</p>
              <button
                @click="revealAnswer"
                class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Reveal Answer
              </button>
            </div>

            <!-- Answer Side -->
            <div v-else class="space-y-6">
              <div class="text-4xl mb-4">
                <img
                  v-if="currentCard.image"
                  :src="currentCard.image"
                  :alt="currentCard.question"
                  class="w-20 h-20 mx-auto mb-4 object-contain"
                />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">{{ currentCard.question }}</h3>
              <div class="bg-white/20 rounded-lg p-4 mb-6">
                <p class="text-white text-xl font-medium">{{ currentCard.answer }}</p>
              </div>

              <!-- Difficulty Buttons -->
              <div class="flex justify-center space-x-4">
                <button
                  @click="answerCard('easy')"
                  class="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Easy
                </button>
                <button
                  @click="answerCard('medium')"
                  class="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Medium
                </button>
                <button
                  @click="answerCard('hard')"
                  class="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Hard
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-white">{{ stats.correct }}</div>
              <div class="text-white/80">Correct</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ stats.incorrect }}</div>
              <div class="text-white/80">Incorrect</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-white">{{ Math.round(stats.accuracy) }}%</div>
              <div class="text-white/80">Accuracy</div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between">
          <button
            @click="previousCard"
            :disabled="currentCardIndex === 0"
            class="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            @click="nextCard"
            class="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Game Complete Modal -->
      <div
        v-if="gameCompleted"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
          <div class="text-6xl mb-4">🎉</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Learning Complete!</h2>
          <p class="text-gray-600 mb-4">
            You finished learning all {{ vocabulary.length }} vocabulary words!
          </p>
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-semibold text-gray-800">{{ stats.correct }}</div>
                <div class="text-gray-600">Correct</div>
              </div>
              <div>
                <div class="font-semibold text-gray-800">{{ stats.incorrect }}</div>
                <div class="text-gray-600">Incorrect</div>
              </div>
              <div class="col-span-2">
                <div class="font-semibold text-gray-800">{{ Math.round(stats.accuracy) }}%</div>
                <div class="text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
          <div class="flex space-x-3">
            <button
              @click="resetGame"
              class="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Study Again
            </button>
            <button
              @click="goBack"
              class="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface VocabularyItem {
  english: string
  vietnamese: string
  image: string
}

interface GameCard {
  question: string
  answer: string
  image: string
  difficulty: 'easy' | 'medium' | 'hard'
}

// Vocabulary data
const vocabulary: VocabularyItem[] = [
  { english: 'Agenda', vietnamese: 'chương trình họp / nội dung cuộc họp', image: '/images/vocab/agenda.svg' },
  { english: 'Schedule', vietnamese: 'lịch trình / sắp xếp lịch', image: '/images/vocab/schedule.svg' },
  { english: 'Reschedule', vietnamese: 'dời lịch', image: '/images/vocab/reschedule.svg' },
  { english: 'Postpone', vietnamese: 'hoãn lại', image: '/images/vocab/postpone.svg' },
  { english: 'Cancel', vietnamese: 'hủy bỏ', image: '/images/vocab/cancel.svg' },
  { english: 'Availability', vietnamese: 'thời gian rảnh', image: '/images/vocab/availability.svg' },
  { english: 'Appointment', vietnamese: 'cuộc hẹn', image: '/images/vocab/appointment.svg' },
  { english: 'Deadline', vietnamese: 'hạn chót', image: '/images/vocab/deadline.svg' },
  { english: 'Time slot', vietnamese: 'khung giờ', image: '/images/vocab/time-slot.svg' },
  { english: 'Conference room', vietnamese: 'phòng họp', image: '/images/vocab/conference-room.svg' },
  { english: 'Briefing', vietnamese: 'buổi họp ngắn / phổ biến thông tin', image: '/images/vocab/briefing.svg' },
  { english: 'Wrap-up', vietnamese: 'phần tổng kết', image: '/images/vocab/wrap-up.svg' },
  { english: 'Follow-up', vietnamese: 'theo dõi / họp tiếp', image: '/images/vocab/follow-up.svg' },
  { english: 'Attendee', vietnamese: 'người tham dự', image: '/images/vocab/attendee.svg' },
  { english: 'Facilitator', vietnamese: 'người điều phối cuộc họp', image: '/images/vocab/facilitator.svg' },
  { english: 'Minutes (of the meeting)', vietnamese: 'biên bản cuộc họp', image: '/images/vocab/minutes.svg' },
  { english: 'Consensus', vietnamese: 'sự đồng thuận', image: '/images/vocab/consensus.svg' },
  { english: 'Conflict (schedule conflict)', vietnamese: 'trùng lịch', image: '/images/vocab/conflict.svg' },
  { english: 'Allocate (time/resources)', vietnamese: 'phân bổ', image: '/images/vocab/allocate.svg' },
  { english: 'Tentative', vietnamese: 'tạm thời / chưa xác nhận', image: '/images/vocab/tentative.svg' }
]

// Game state
const gameStarted = ref(false)
const gameMode = ref<'english-to-vietnamese' | 'vietnamese-to-english'>('english-to-vietnamese')
const currentCardIndex = ref(0)
const showAnswer = ref(false)
const gameCards = ref<GameCard[]>([])
const gameCompleted = ref(false)

// Statistics
const stats = ref({
  correct: 0,
  incorrect: 0,
  accuracy: 0
})

const currentCard = computed(() => gameCards.value[currentCardIndex.value])

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }
  return shuffled
}

const startGame = (mode: 'english-to-vietnamese' | 'vietnamese-to-english') => {
  gameMode.value = mode
  gameStarted.value = true
  gameCompleted.value = false
  currentCardIndex.value = 0
  showAnswer.value = false

  // Create game cards based on mode
  gameCards.value = vocabulary.map(item => ({
    question: mode === 'english-to-vietnamese' ? item.english : item.vietnamese,
    answer: mode === 'english-to-vietnamese' ? item.vietnamese : item.english,
    image: item.image,
    difficulty: 'medium' as const
  }))

  // Shuffle the cards
  gameCards.value = shuffleArray(gameCards.value)

  // Reset stats
  stats.value = {
    correct: 0,
    incorrect: 0,
    accuracy: 0
  }
}

const revealAnswer = () => {
  showAnswer.value = true
}

const answerCard = (difficulty: 'easy' | 'medium' | 'hard') => {
  // Update stats based on difficulty
  if (difficulty === 'easy') {
    stats.value.correct++
  } else if (difficulty === 'medium') {
    stats.value.correct++
  } else {
    stats.value.incorrect++
  }

  // Update accuracy
  const total = stats.value.correct + stats.value.incorrect
  stats.value.accuracy = total > 0 ? (stats.value.correct / total) * 100 : 0

  // Move to next card
  nextCard()
}

const nextCard = () => {
  showAnswer.value = false

  if (currentCardIndex.value < gameCards.value.length - 1) {
    currentCardIndex.value++
  } else {
    gameCompleted.value = true
  }
}

const previousCard = () => {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--
    showAnswer.value = false
  }
}

const resetGame = () => {
  gameStarted.value = false
  gameCompleted.value = false
  currentCardIndex.value = 0
  showAnswer.value = false
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  // Initialize any game state if needed
})
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>