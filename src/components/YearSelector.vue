<script setup lang="ts">
/**
 * YearSelector Component
 * 
 * Component cho phép chọn năm để xem countdown Tết năm đó
 * 
 * Emit:
 * - year-changed: Khi người dùng chọn năm khác
 * 
 * Kiến thức Vue:
 * - v-model với select
 * - defineEmits
 * - @change event
 */

import { ref } from 'vue';
import { getAvailableYears } from '../utils/lunarCalendar';

interface Props {
  modelValue: number;
}

interface Emits {
  (e: 'update:modelValue', year: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Lấy danh sách năm từ lunar calendar
const availableYears = getAvailableYears();

// Local reactive value
const selectedYear = ref(props.modelValue);

// Handler khi chọn năm mới
function handleYearChange() {
  emit('update:modelValue', selectedYear.value);
}
</script>

<template>
  <div class="year-selector">
    <label for="year-select" class="year-label">
      Chọn năm:
    </label>
    
    <select
      id="year-select"
      v-model.number="selectedYear"
      class="year-select"
      @change="handleYearChange"
    >
      <option
        v-for="year in availableYears"
        :key="year"
        :value="year"
      >
        {{ year }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.year-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.year-label {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.year-select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  background-color: white;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.year-select:hover {
  border-color: #dc2626;
}

.year-select:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

/* Responsive */
@media (max-width: 640px) {
  .year-selector {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
