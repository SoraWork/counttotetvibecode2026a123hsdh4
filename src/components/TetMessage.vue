<script setup lang="ts">
/**
 * TetMessage Component
 * 
 * Hiển thị lời chúc mừng Tết khi countdown kết thúc
 * 
 * Props:
 * - year: Năm Tết
 * 
 * Kiến thức Vue:
 * - Props và template syntax
 * - CSS animations
 */

interface Props {
  year: number;
}

defineProps<Props>();
</script>

<template>
  <div class="tet-message">
    <div class="message-content">
      <h1 class="message-title">
        🎉 Chúc Mừng Năm Mới {{ year }}! 🎉
      </h1>
      
      <p class="message-text">
        Xuân về đất trời tươi mới<br>
        Chúc bạn và gia đình<br>
        An khang thịnh vượng<br>
        Vạn sự như ý!
      </p>
      
      <div class="decorations">
        <span class="decoration">🧧</span>
        <span class="decoration">🎊</span>
        <span class="decoration">🏮</span>
        <span class="decoration">🌸</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tet-message {
  padding: 2rem;
  text-align: center;
}

.message-content {
  animation: fadeInUp 0.8s ease-out;
}

.message-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #dc2626;
  margin-bottom: 1.5rem;
  animation: bounce 1s ease-in-out infinite;
}

.message-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 2rem;
}

.decorations {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  font-size: 2rem;
}

.decoration {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

.decoration:nth-child(2) {
  animation-delay: 0.5s;
}

.decoration:nth-child(3) {
  animation-delay: 1s;
}

.decoration:nth-child(4) {
  animation-delay: 1.5s;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .message-title {
    font-size: 1.75rem;
  }
  
  .message-text {
    font-size: 1rem;
  }
  
  .decorations {
    font-size: 1.5rem;
    gap: 1rem;
  }
}
</style>
