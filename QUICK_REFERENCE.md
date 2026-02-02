# 🚀 Quick Reference Guide

## Project Structure
```
tet-countdown/
├── src/
│   ├── components/
│   │   ├── CountdownTimer.vue    # Timer display
│   │   ├── YearSelector.vue      # Year picker
│   │   └── TetMessage.vue        # Celebration message
│   ├── composables/
│   │   └── useCountdown.ts       # Countdown logic
│   ├── utils/
│   │   └── lunarCalendar.ts      # Tet date calculator
│   ├── styles/
│   │   └── animations.css        # Global animations
│   ├── App.vue                   # Main component
│   └── main.ts                   # Entry point
├── README.md                     # Full documentation
├── TESTING.md                    # Testing guide
├── IMPLEMENTATION.md             # Implementation summary
└── start.sh                      # Quick start script
```

## Quick Commands

### Setup & Run
```bash
npm install           # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
./start.sh           # Quick start script
```

### Development
```bash
# Dev server runs at http://localhost:5173
# Hot reload enabled
# TypeScript checking enabled
```

## Key Concepts

### 1. Composables (useCountdown.ts)
```typescript
const { days, hours, minutes, seconds, isFinished } = useCountdown(targetDate);
```
- Reusable stateful logic
- Returns reactive refs
- Handles lifecycle

### 2. Props & Emits
```vue
<!-- Parent → Child -->
<CountdownTimer :days="10" :hours="5" />

<!-- Child → Parent -->
<YearSelector v-model="selectedYear" />
```

### 3. Reactive State
```typescript
const count = ref(0);           // Primitive
const doubled = computed(() => count.value * 2);  // Derived
watch(count, (val) => {...});   // Side effects
```

## Component APIs

### CountdownTimer
```typescript
Props: {
  days: number
  hours: number
  minutes: number
  seconds: number
}
```

### YearSelector
```typescript
Props: {
  modelValue: number
}
Emits: {
  'update:modelValue': (year: number) => void
}
```

### TetMessage
```typescript
Props: {
  year: number
}
```

## Composable API

### useCountdown
```typescript
function useCountdown(targetDate: Date): CountdownState

interface CountdownState {
  days: Ref<number>
  hours: Ref<number>
  minutes: Ref<number>
  seconds: Ref<number>
  isFinished: Ref<boolean>
  remainingMs: Ref<number>
}
```

## Utility APIs

### lunarCalendar
```typescript
getTetDate(year: number): Date
getAvailableYears(): number[]
hasYearData(year: number): boolean
```

## Common Patterns

### Create Reactive State
```typescript
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
```

### Lifecycle Hooks
```typescript
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  // Setup
});

onUnmounted(() => {
  // Cleanup
});
```

### Component Props
```vue
<script setup lang="ts">
interface Props {
  title: string;
}
defineProps<Props>();
</script>
```

### Emit Events
```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', value: number): void;
}>();

emit('change', 42);
</script>
```

## Styling Tips

### Scoped Styles
```vue
<style scoped>
/* Only affects this component */
.my-class { ... }
</style>
```

### CSS Variables
```css
:root {
  --color-primary: #dc2626;
}

.element {
  color: var(--color-primary);
}
```

### Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 0.5s ease-out;
}
```

## TypeScript Tips

### Interface for Props
```typescript
interface Props {
  count: number;
  message?: string;  // Optional
}
```

### Ref Typing
```typescript
const count: Ref<number> = ref(0);
// or
const count = ref<number>(0);
```

### Function Typing
```typescript
function format(num: number): string {
  return num.toString();
}
```

## Debugging

### Console Logging
```typescript
if (import.meta.env.DEV) {
  console.log('Debug info:', value);
}
```

### Vue DevTools
1. Install Vue DevTools extension
2. Inspect components
3. Check reactive state
4. Monitor events

## Performance Tips

1. **Use computed for derived state**
   ```typescript
   const doubled = computed(() => count.value * 2);
   ```

2. **Cleanup side effects**
   ```typescript
   onUnmounted(() => {
     clearInterval(intervalId);
   });
   ```

3. **Avoid unnecessary re-renders**
   - Use v-once for static content
   - Use v-memo for expensive lists
   - Keep computed pure

## Testing Checklist

- [ ] App loads without errors
- [ ] Countdown updates every second
- [ ] Year selector changes countdown
- [ ] Tet message shows when finished
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Animations are smooth

## Resources

- [Vue 3 Docs](https://vuejs.org/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [Vite Docs](https://vitejs.dev/)

## Need Help?

1. Check README.md for detailed explanations
2. Read TESTING.md for validation steps
3. Review code comments
4. Check browser console for errors

---

**Happy Coding! 🎉**
