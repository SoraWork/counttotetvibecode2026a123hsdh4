<script setup lang="ts">
/**
 * App.vue - Main Application Component
 * 
 * Tích hợp tất cả các component và logic:
 * - YearSelector: Cho phép chọn năm
 * - CountdownTimer: Hiển thị đếm ngược
 * - TetMessage: Hiển thị lời chúc khi hết thời gian
 * 
 * Kiến thức Vue:
 * - Reactive state với ref
 * - Computed properties
 * - Watch để theo dõi thay đổi
 * - Component composition
 */

import { ref, computed, watch } from 'vue';
import CountdownTimer from './components/CountdownTimer.vue';
import YearSelector from './components/YearSelector.vue';
import TetMessage from './components/TetMessage.vue';
import { getTetDate } from './utils/lunarCalendar';
import { useCountdown } from './composables/useCountdown';

// State: Năm được chọn (default = năm hiện tại hoặc năm tiếp theo)
const currentYear = new Date().getFullYear();
const selectedYear = ref(currentYear);

// Computed: Ngày Tết của năm được chọn
const tetDate = computed(() => {
  try {
    return getTetDate(selectedYear.value);
  } catch (error) {
    console.error('Error getting Tet date:', error);
    // Fallback về năm hiện tại nếu có lỗi
    return getTetDate(currentYear);
  }
});

// Reactive countdown state
const countdown = useCountdown(tetDate.value);

// Watch: Khi đổi năm, update countdown
// Note: useCountdown không tự động update khi tetDate thay đổi,
// nên cần re-mount component hoặc dùng key
const componentKey = ref(0);

watch(selectedYear, () => {
  // Force re-render component để restart countdown
  componentKey.value++;
  
  if (import.meta.env.DEV) {
    console.log('Year changed to:', selectedYear.value);
    console.log('Tet date:', tetDate.value.toLocaleDateString('vi-VN'));
  }
});

// Computed: Xác định xem Tết đã qua chưa
const isTetPassed = computed(() => {
  const now = new Date();
  return tetDate.value < now;
});
</script>

<template>
  <div id="app">
    <!-- Header -->
    <header class="app-header">
      <h1 class="app-title">
        🎊 Countdown to Tết 🎊
      </h1>
      <p class="app-subtitle">
        Đếm ngược đến Tết Nguyên Đán
      </p>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <!-- Year Selector -->
      <div class="year-selector-wrapper">
        <YearSelector v-model="selectedYear" />
      </div>

      <!-- Tet Date Display -->
      <div class="tet-date-display">
        <p class="tet-date-label">Tết {{ selectedYear }}:</p>
        <p class="tet-date-value">
          {{ tetDate.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) }}
        </p>
      </div>

      <!-- Countdown or Message -->
      <div :key="componentKey" class="countdown-container">
        <!-- Show countdown if not finished and not passed -->
        <div v-if="!countdown.isFinished.value && !isTetPassed" class="countdown-wrapper">
          <CountdownTimer
            :days="countdown.days.value"
            :hours="countdown.hours.value"
            :minutes="countdown.minutes.value"
            :seconds="countdown.seconds.value"
          />
        </div>

        <!-- Show message if finished or Tet has passed -->
        <div v-else class="message-wrapper">
          <TetMessage :year="selectedYear" />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>
        Made with ❤️ using Vue 3 + TypeScript
      </p>
      <p class="footer-note">
        Học tập Composition API, Composables, và Reactive Programming
      </p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #fef3c7 0%, #fecaca 100%);
}

.app-header {
  text-align: center;
  padding: 2rem 1rem;
  animation: slideInUp 0.6s ease-out;
}

.app-title {
  font-size: 3rem;
  font-weight: 800;
  background: var(--gradient-tet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-light);
  font-weight: 500;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  gap: 2rem;
}

.year-selector-wrapper {
  animation: fadeIn 0.8s ease-out 0.2s both;
}

.tet-date-display {
  text-align: center;
  animation: fadeIn 0.8s ease-out 0.4s both;
}

.tet-date-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
}

.tet-date-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.countdown-container {
  width: 100%;
  max-width: 800px;
}

.countdown-wrapper,
.message-wrapper {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: slideInUp 0.8s ease-out 0.6s both;
}

.app-footer {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--color-text-light);
  font-size: 0.875rem;
}

.footer-note {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-style: italic;
}

/* Responsive */
@media (max-width: 640px) {
  .app-title {
    font-size: 2rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
  }
  
  .tet-date-value {
    font-size: 1.125rem;
  }
  
  .countdown-wrapper,
  .message-wrapper {
    padding: 1.5rem;
  }
}

/* Import animations */
@import './styles/animations.css';
</style>
