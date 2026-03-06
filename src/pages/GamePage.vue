<template>
  <div
    class="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-500 to-pink-500"
  >
    <!-- Decorative blurred circles -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl z-0"></div>
    <div
      class="absolute bottom-20 right-20 w-60 h-60 bg-pink-400/30 rounded-full blur-3xl z-0"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl z-0"
      style="transform: translate(-50%, -50%)"
    ></div>

    <!-- Header -->
    <header
      class="relative z-10 w-full max-w-2xl mx-auto flex items-center justify-between py-6 px-6"
    >
      <div class="flex items-center space-x-4">
        <button
          @click="goBack"
          class="text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2"
        >
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 class="text-2xl font-extrabold text-white tracking-tight">Vocabulary Learning</h1>
      </div>
      <div class="text-white/80 text-base font-semibold">
        {{ currentCardIndex + 1 }} / {{ vocabulary.length }}
      </div>
    </header>

    <!-- Progress Bar -->
    <div class="relative z-10 w-full max-w-2xl mx-auto px-6 mb-6">
      <div class="bg-white/20 rounded-full h-4">
        <div
          class="bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 h-4 rounded-full transition-all duration-500"
          :style="{ width: `${((currentCardIndex + 1) / vocabulary.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Main Game Area -->
    <div class="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center">
      <!-- Mode Selection (if not started) -->
      <div v-if="!gameStarted" class="w-full flex flex-col items-center justify-center py-16">
        <h2 class="text-4xl font-extrabold text-white mb-10 tracking-tight">
          Choose Your Learning Mode
        </h2>
        <div class="grid md:grid-cols-2 gap-8 w-full max-w-xl">
          <button
            @click="startGame('english-to-vietnamese')"
            class="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 shadow-xl text-center flex flex-col items-center group"
          >
            <div class="text-3xl mb-4">🇺🇸 → 🇻🇳</div>
            <h3 class="text-2xl font-bold text-white mb-2">English to Vietnamese</h3>
            <p class="text-white/80 text-base">See English words, guess Vietnamese meanings</p>
          </button>
          <button
            @click="startGame('vietnamese-to-english')"
            class="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 shadow-xl text-center flex flex-col items-center group"
          >
            <div class="text-3xl mb-4">🇻🇳 → 🇺🇸</div>
            <h3 class="text-2xl font-bold text-white mb-2">Vietnamese to English</h3>
            <p class="text-white/80 text-base">See Vietnamese meanings, guess English words</p>
          </button>
        </div>
      </div>

      <!-- Flashcard Game -->
      <transition name="card-fade" mode="out-in">
        <div
          v-if="gameStarted && currentCard"
          :key="currentCardIndex"
          class="space-y-10 w-full flex flex-col items-center justify-center"
        >
          <!-- Learning Card -->
          <div
            class="w-full max-w-xl mx-auto bg-white/10 backdrop-blur border border-white/20 rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center relative animate-card-fade"
          >
            <!-- <div class="text-5xl mb-6">
              <img
                v-if="currentCard.image"
                :src="currentCard.image"
                :alt="currentCard.question"
                class="w-24 h-24 mx-auto mb-4 object-contain drop-shadow-xl"
              />
            </div> -->
            <h3 class="text-4xl font-extrabold text-white mb-6 tracking-tight">
              {{ currentCard.question }}
            </h3>
            <p class="text-lg text-white/80 mb-8">Type your answer below:</p>
            <div class="w-full flex flex-col md:flex-row items-center gap-4">
              <input
                v-model="userAnswer"
                :disabled="answerChecked"
                @keyup.enter="checkAnswer"
                class="w-full md:w-2/3 px-6 py-4 text-xl text-center bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 shadow-lg"
                :class="{
                  'border-green-400 bg-green-500/20 animate-correct': answerChecked && isCorrect,
                  'border-red-400 bg-red-500/20 animate-wrong': answerChecked && !isCorrect,
                }"
                placeholder="Type your answer here..."
                ref="answerInput"
              />
              <button
                v-if="!answerChecked"
                @click="checkAnswer"
                class="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Check Answer
              </button>
            </div>
            <transition name="fade">
              <div v-if="answerChecked" class="flex flex-col items-center mt-8 w-full">
                <div
                  class="text-2xl font-bold mb-2"
                  :class="
                    isCorrect ? 'text-green-400 animate-correct' : 'text-red-400 animate-wrong'
                  "
                >
                  {{ isCorrect ? '✅ Correct!' : '❌ Incorrect' }}
                </div>
                <div v-if="!isCorrect" class="bg-white/20 rounded-lg p-3 mt-2">
                  <span class="text-white/80 text-base">Correct answer:</span>
                  <span class="text-white text-xl font-semibold">{{ currentCard.answer }}</span>
                </div>
                <button
                  @click="nextCard"
                  class="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform duration-200 mt-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  Next
                </button>
              </div>
            </transition>
          </div>

          <!-- Statistics Panel -->
          <div class="w-full max-w-xl grid grid-cols-3 gap-6 mt-2">
            <div class="bg-white/20 rounded-xl p-6 flex flex-col items-center shadow">
              <div class="text-green-400 text-3xl mb-2">✔️</div>
              <div class="text-2xl font-bold text-white">{{ stats.correct }}</div>
              <div class="text-white/80 text-base">Correct</div>
            </div>
            <div class="bg-white/20 rounded-xl p-6 flex flex-col items-center shadow">
              <div class="text-red-400 text-3xl mb-2">❌</div>
              <div class="text-2xl font-bold text-white">{{ stats.incorrect }}</div>
              <div class="text-white/80 text-base">Incorrect</div>
            </div>
            <div class="bg-white/20 rounded-xl p-6 flex flex-col items-center shadow">
              <div class="text-indigo-400 text-3xl mb-2">📊</div>
              <div class="text-2xl font-bold text-white">{{ Math.round(stats.accuracy) }}%</div>
              <div class="text-white/80 text-base">Accuracy</div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="w-full flex justify-between items-center mt-10">
            <button
              @click="previousCard"
              :disabled="currentCardIndex === 0"
              class="bg-gradient-to-r from-white/30 via-indigo-200/30 to-purple-200/30 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white"
            >
              Previous
            </button>
            <button
              @click="nextCard"
              :disabled="currentCardIndex === gameCards.length - 1"
              class="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Next
            </button>
          </div>
        </div>
      </transition>

      <!-- Game Complete Modal -->
      <transition name="modal-fade">
        <div
          v-if="gameCompleted"
          class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <div
            class="bg-white rounded-3xl p-12 max-w-md w-full mx-4 text-center shadow-2xl relative animate-card-fade"
          >
            <div class="text-7xl mb-6">🎉</div>
            <h2 class="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
              Learning Complete!
            </h2>
            <p class="text-gray-600 mb-6 text-lg">
              You finished learning all {{ vocabulary.length }} vocabulary words!
            </p>
            <div class="bg-gray-50 rounded-xl p-6 mb-8 grid grid-cols-2 gap-6">
              <div>
                <div class="font-bold text-2xl text-green-500">{{ stats.correct }}</div>
                <div class="text-gray-600">Correct</div>
              </div>
              <div>
                <div class="font-bold text-2xl text-red-500">{{ stats.incorrect }}</div>
                <div class="text-gray-600">Incorrect</div>
              </div>
              <div class="col-span-2">
                <div class="font-bold text-2xl text-indigo-500">
                  {{ Math.round(stats.accuracy) }}%
                </div>
                <div class="text-gray-600">Accuracy</div>
              </div>
            </div>
            <div class="flex space-x-4 justify-center">
              <button
                @click="resetGame"
                class="bg-gradient-to-r from-gray-200 via-indigo-200 to-purple-200 text-gray-800 px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition-transform duration-200"
              >
                Study Again
              </button>
              <button
                @click="goBack"
                class="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition-transform duration-200"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </transition>
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
const userAnswer = ref('')
const answerChecked = ref(false)
const isCorrect = ref(false)
const gameCards = ref<GameCard[]>([])
const gameCompleted = ref(false)
const answerInput = ref<HTMLInputElement>()

// Statistics
const stats = ref({
  correct: 0,
  incorrect: 0,
  accuracy: 0,
})

const currentCard = computed(() => gameCards.value[currentCardIndex.value]!)

const shuffleArray = <T,>(array: T[]): T[] => {
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
  userAnswer.value = ''
  answerChecked.value = false
  isCorrect.value = false

  gameCards.value = vocabulary.map(item => ({
    question: mode === 'english-to-vietnamese' ? item.english : item.vietnamese,
    answer: mode === 'english-to-vietnamese' ? item.vietnamese : item.english,
    image: item.image,
    difficulty: 'medium' as const,
  }))

  gameCards.value = shuffleArray(gameCards.value)

  stats.value = { correct: 0, incorrect: 0, accuracy: 0 }
}

const checkAnswer = () => {
  if (!currentCard.value || answerChecked.value) return
  const userInput = userAnswer.value.trim().toLowerCase()
  const correctAnswer = currentCard.value.answer.toLowerCase()
  isCorrect.value = userInput === correctAnswer
  answerChecked.value = true

  if (isCorrect.value) stats.value.correct++
  else stats.value.incorrect++

  const total = stats.value.correct + stats.value.incorrect
  stats.value.accuracy = total > 0 ? (stats.value.correct / total) * 100 : 0
}

const nextCard = () => {
  userAnswer.value = ''
  answerChecked.value = false
  isCorrect.value = false
  if (currentCardIndex.value < gameCards.value.length - 1) {
    currentCardIndex.value++
    setTimeout(() => { answerInput.value?.focus() }, 100)
  } else {
    gameCompleted.value = true
  }
}

const previousCard = () => {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--
    userAnswer.value = ''
    answerChecked.value = false
    isCorrect.value = false
    setTimeout(() => { answerInput.value?.focus() }, 100)
  }
}

const resetGame = () => {
  gameStarted.value = false
  gameCompleted.value = false
  currentCardIndex.value = 0
  userAnswer.value = ''
  answerChecked.value = false
  isCorrect.value = false
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  // initial focus if desired
})
</script>

<style scoped>
@keyframes correct {
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes wrong {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-8px);
  }
  40% {
    transform: translateX(8px);
  }
  60% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(8px);
  }
  100% {
    transform: translateX(0);
  }
}
.animate-correct {
  animation: correct 0.5s;
}
.animate-wrong {
  animation: wrong 0.5s;
}
.card-fade-enter-active,
.card-fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.card-fade-enter-from {
  opacity: 0;
  transform: scale(0.96);
}
.card-fade-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
