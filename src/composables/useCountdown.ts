import { ref, onMounted, onUnmounted, computed, type Ref } from 'vue';

/**
 * Countdown Composable
 * 
 * Composable để tạo bộ đếm ngược realtime đến một thời điểm cụ thể.
 * Tự động cập nhật mỗi giây và cleanup khi component unmount.
 * 
 * Kiến thức Vue:
 * - ref(): Tạo reactive state
 * - computed(): Tính toán derived state
 * - onMounted/onUnmounted: Lifecycle hooks
 * - setInterval/clearInterval: Browser APIs
 */

export interface CountdownState {
  /** Số ngày còn lại */
  days: Ref<number>;
  /** Số giờ còn lại (0-23) */
  hours: Ref<number>;
  /** Số phút còn lại (0-59) */
  minutes: Ref<number>;
  /** Số giây còn lại (0-59) */
  seconds: Ref<number>;
  /** Đã hết thời gian chưa */
  isFinished: Ref<boolean>;
  /** Thời gian còn lại tính bằng milliseconds */
  remainingMs: Ref<number>;
}

/**
 * Hook để tạo countdown đến một ngày cụ thể
 * 
 * @param targetDate - Ngày đích (Date object)
 * @returns Đối tượng chứa các reactive values
 * 
 * @example
 * ```vue
 * <script setup>
 * const tet = new Date(2025, 0, 29);
 * const { days, hours, minutes, seconds, isFinished } = useCountdown(tet);
 * </script>
 * 
 * <template>
 *   <div v-if="!isFinished">
 *     {{ days }} ngày {{ hours }} giờ {{ minutes }} phút {{ seconds }} giây
 *   </div>
 *   <div v-else>Đã đến Tết!</div>
 * </template>
 * ```
 */
export function useCountdown(targetDate: Date): CountdownState {
  // Reactive state - sẽ tự động update UI khi thay đổi
  const remainingMs = ref(0);
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  
  // Computed state - tự động tính toán dựa trên remainingMs
  const isFinished = computed(() => remainingMs.value <= 0);
  
  // Interval ID để cleanup sau này
  let intervalId: number | null = null;
  
  /**
   * Tính toán thời gian còn lại
   * 
   * Logic:
   * 1. Lấy thời gian hiện tại
   * 2. Tính khoảng cách đến targetDate
   * 3. Chuyển đổi milliseconds thành days/hours/minutes/seconds
   */
  function updateCountdown() {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const diff = target - now;
    
    // Nếu đã qua thời điểm đích, set về 0
    if (diff <= 0) {
      remainingMs.value = 0;
      days.value = 0;
      hours.value = 0;
      minutes.value = 0;
      seconds.value = 0;
      
      // Dừng interval khi đã hết thời gian
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      
      return;
    }
    
    // Cập nhật remainingMs
    remainingMs.value = diff;
    
    // Tính toán các đơn vị thời gian
    // 1 ngày = 24h = 1440 phút = 86,400 giây = 86,400,000 ms
    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = MS_PER_SECOND * 60;
    const MS_PER_HOUR = MS_PER_MINUTE * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;
    
    // Chia lấy phần nguyên và lấy phần dư
    days.value = Math.floor(diff / MS_PER_DAY);
    const afterDays = diff % MS_PER_DAY;
    
    hours.value = Math.floor(afterDays / MS_PER_HOUR);
    const afterHours = afterDays % MS_PER_HOUR;
    
    minutes.value = Math.floor(afterHours / MS_PER_MINUTE);
    const afterMinutes = afterHours % MS_PER_MINUTE;
    
    seconds.value = Math.floor(afterMinutes / MS_PER_SECOND);
  }
  
  // Mount: Bắt đầu countdown
  onMounted(() => {
    // Tính ngay lập tức để không phải đợi 1 giây
    updateCountdown();
    
    // Cập nhật mỗi giây
    intervalId = window.setInterval(updateCountdown, 1000);
    
    if (import.meta.env.DEV) {
      console.log('✅ Countdown started for:', targetDate.toLocaleDateString('vi-VN'));
    }
  });
  
  // Unmount: Cleanup để tránh memory leak
  onUnmounted(() => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      
      if (import.meta.env.DEV) {
        console.log('🧹 Countdown cleaned up');
      }
    }
  });
  
  // Return reactive state
  return {
    days,
    hours,
    minutes,
    seconds,
    isFinished,
    remainingMs,
  };
}

/**
 * Format số với leading zero (01, 02, ..., 10, 11, ...)
 * Utility helper cho việc hiển thị
 */
export function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}
