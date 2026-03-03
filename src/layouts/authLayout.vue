<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
    <!-- blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <div class="relative z-10 w-full max-w-lg overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.blob {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.4;
  animation: float 12s ease-in-out infinite;
}

.blob-1 {
  background: #3b82f6;
  top: -100px;
  left: -100px;
}

.blob-2 {
  background: #6366f1;
  bottom: -100px;
  right: -100px;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(40px, 60px);
  }
}
</style>
