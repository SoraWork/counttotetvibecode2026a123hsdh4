<script setup lang="ts">
/**
 * CountdownTimer Component
 * 
 * Component hiển thị bộ đếm ngược dạng card với 4 phần: Ngày-Giờ-Phút-Giây
 * 
 * Props:
 * - days, hours, minutes, seconds: Số cần hiển thị
 * 
 * Kiến thức Vue:
 * - defineProps với TypeScript
 * - Template syntax cơ bản
 * - Scoped styles
 */

import { padZero } from '../composables/useCountdown';

interface Props {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

defineProps<Props>();
</script>

<template>
  <div class="countdown-timer">
    <!-- Card cho mỗi đơn vị thời gian -->
    <div class="time-unit">
      <div class="time-value">{{ days }}</div>
      <div class="time-label">Ngày</div>
    </div>
    
    <div class="separator">:</div>
    
    <div class="time-unit">
      <div class="time-value">{{ padZero(hours) }}</div>
      <div class="time-label">Giờ</div>
    </div>
    
    <div class="separator">:</div>
    
    <div class="time-unit">
      <div class="time-value">{{ padZero(minutes) }}</div>
      <div class="time-label">Phút</div>
    </div>
    
    <div class="separator">:</div>
    
    <div class="time-unit">
      <div class="time-value">{{ padZero(seconds) }}</div>
      <div class="time-label">Giây</div>
    </div>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 80px;
}

.time-value {
  font-size: 3rem;
  font-weight: 700;
  color: #dc2626;
  font-variant-numeric: tabular-nums;
  /* Animation sẽ thêm ở STEP 6 */
}

.time-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.separator {
  font-size: 2.5rem;
  font-weight: 700;
  color: #9ca3af;
  margin: 0 0.25rem;
}

/* Responsive cho mobile */
@media (max-width: 640px) {
  .countdown-timer {
    gap: 0.75rem;
  }
  
  .time-unit {
    min-width: 60px;
  }
  
  .time-value {
    font-size: 2rem;
  }
  
  .time-label {
    font-size: 0.75rem;
  }
  
  .separator {
    font-size: 1.75rem;
    margin: 0;
  }
}
</style>
