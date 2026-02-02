# 🎊 Countdown to Tết - Vue 3 Learning Project

Ứng dụng đếm ngược đến Tết Nguyên Đán, được xây dựng để học Vue 3 Composition API, TypeScript, và các best practices của modern web development.

## 📋 Mục Lục

- [Tính năng](#-tính-năng)
- [Công nghệ](#-công-nghệ)
- [Cấu trúc Project](#-cấu-trúc-project)
- [Cài đặt & Chạy](#-cài-đặt--chạy)
- [Kiến thức học được](#-kiến-thức-học-được)
- [Luồng hoạt động](#-luồng-hoạt-động)
- [Learning Notes](#-learning-notes)

## ✨ Tính năng

- ✅ Đếm ngược realtime đến Tết Nguyên Đán
- ✅ Chọn năm bất kỳ (2020-2035)
- ✅ Hiển thị rõ ràng: Ngày - Giờ - Phút - Giây
- ✅ Animation mượt mà
- ✅ Responsive design (mobile-friendly)
- ✅ Lời chúc mừng khi đến Tết
- ✅ Zero external dependencies (ngoài Vue)

## 🛠 Công nghệ

- **Vue 3** - Progressive JavaScript Framework
- **Composition API** - Modern Vue development approach
- **TypeScript** - Type safety và better DX
- **Vite** - Fast build tool và dev server
- **CSS3** - Animations và styling

## 📁 Cấu trúc Project

```
tet-countdown/
├── src/
│   ├── components/          # Vue components
│   │   ├── CountdownTimer.vue    # Hiển thị countdown
│   │   ├── YearSelector.vue      # Chọn năm
│   │   └── TetMessage.vue        # Lời chúc Tết
│   ├── composables/         # Reusable logic
│   │   └── useCountdown.ts       # Countdown composable
│   ├── utils/               # Utility functions
│   │   └── lunarCalendar.ts      # Tính ngày Tết
│   ├── styles/              # Global styles
│   │   └── animations.css        # Animations
│   ├── App.vue              # Root component
│   └── main.ts              # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── README.md                # Documentation
```

## 🚀 Cài đặt & Chạy

### Prerequisites

- Node.js 18+ và npm

### Các bước

1. **Clone hoặc tải project**

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy development server**
```bash
npm run dev
```

4. **Mở browser**
```
http://localhost:5173
```

5. **Build cho production (optional)**
```bash
npm run build
```

## 📚 Kiến thức học được

### 1. Vue 3 Composition API

#### Reactive State với `ref` và `computed`
```typescript
// ref: Tạo reactive primitive value
const count = ref(0);
count.value++; // Update value

// computed: Tạo derived state
const doubled = computed(() => count.value * 2);
```

#### Lifecycle Hooks
```typescript
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  // Component đã mount
});

onUnmounted(() => {
  // Cleanup trước khi unmount
});
```

### 2. Composables Pattern

**Composables** là functions tái sử dụng được để đóng gói stateful logic.

Ví dụ trong project: `useCountdown.ts`
```typescript
export function useCountdown(targetDate: Date) {
  const days = ref(0);
  const hours = ref(0);
  // ... reactive state
  
  onMounted(() => {
    // Setup interval
  });
  
  onUnmounted(() => {
    // Cleanup
  });
  
  return { days, hours, ... };
}
```

**Lợi ích:**
- Logic tách biệt khỏi UI
- Dễ test
- Tái sử dụng được
- Type-safe với TypeScript

### 3. Component Communication

#### Props (Parent → Child)
```vue
<!-- Parent -->
<CountdownTimer :days="10" :hours="5" />

<!-- Child -->
<script setup lang="ts">
defineProps<{
  days: number;
  hours: number;
}>();
</script>
```

#### Emits (Child → Parent)
```vue
<!-- Child -->
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

emit('update:modelValue', newValue);
</script>

<!-- Parent -->
<YearSelector v-model="selectedYear" />
```

### 4. Reactive Time Programming

**Countdown logic:**
1. Lấy thời gian hiện tại (`Date.now()`)
2. Tính khoảng cách đến target (`target - now`)
3. Chuyển đổi milliseconds → days/hours/minutes/seconds
4. Update mỗi 1 giây với `setInterval`
5. Cleanup interval khi unmount

**Memory Leak Prevention:**
```typescript
let intervalId: number | null = null;

onMounted(() => {
  intervalId = setInterval(update, 1000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
```

### 5. TypeScript Integration

**Interface cho Props:**
```typescript
interface Props {
  days: number;
  hours: number;
}

defineProps<Props>();
```

**Type-safe Composables:**
```typescript
export interface CountdownState {
  days: Ref<number>;
  hours: Ref<number>;
  isFinished: Ref<boolean>;
}

export function useCountdown(target: Date): CountdownState {
  // ...
}
```

### 6. CSS Animations

**Keyframes:**
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.element {
  animation: pulse 2s infinite;
}
```

## 🔄 Luồng hoạt động

```
1. User mở app
   ↓
2. App.vue khởi tạo
   - selectedYear = năm hiện tại
   - getTetDate(selectedYear) → tetDate
   ↓
3. useCountdown(tetDate) bắt đầu
   - setInterval update mỗi 1s
   - Tính toán days/hours/minutes/seconds
   ↓
4. CountdownTimer render với reactive data
   ↓
5. User chọn năm khác
   - YearSelector emit 'update:modelValue'
   - selectedYear thay đổi
   - tetDate được tính lại
   - Component re-mount với key mới
   - useCountdown restart với target mới
   ↓
6. Khi countdown.isFinished = true
   - TetMessage hiển thị thay vì CountdownTimer
```

## 📖 Learning Notes

### Composition API vs Options API

**Options API (cũ):**
```javascript
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() { this.count++; }
  }
}
```

**Composition API (mới):**
```javascript
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    return { count, increment };
  }
}
```

**`<script setup>` syntax (recommended):**
```javascript
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
</script>
```

### Tại sao dùng Composables?

**Trước đây (mixins):**
- Khó trace nguồn gốc properties
- Name conflicts
- Implicit dependencies

**Bây giờ (composables):**
```typescript
const countdown = useCountdown(targetDate);
// Rõ ràng: countdown đến từ đâu
// Type-safe: biết countdown có gì
```

### Reactive State Deep Dive

```typescript
// ref: Cho primitive values
const count = ref(0);
console.log(count.value); // 0

// reactive: Cho objects
const state = reactive({
  count: 0,
  message: 'Hello'
});
console.log(state.count); // 0 (không cần .value)

// computed: Read-only derived state
const doubled = computed(() => count.value * 2);

// watch: Side effects khi state thay đổi
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`);
});
```

### Best Practices từ Project

1. **Tách logic khỏi UI**: `useCountdown` composable
2. **Single Responsibility**: Mỗi component làm 1 việc
3. **Type Safety**: TypeScript interfaces cho tất cả
4. **Cleanup**: Luôn clear intervals/timeouts
5. **Semantic HTML**: Đúng tags, accessibility
6. **Responsive Design**: Mobile-first approach
7. **Comments**: Giải thích WHY, không chỉ WHAT

## 🎯 Challenges để Mở Rộng

Muốn học thêm? Thử implement:

1. **Persistence**: Lưu năm đã chọn vào localStorage
2. **Notifications**: Browser notification khi đến Tết
3. **Sound Effects**: Âm thanh countdown
4. **Share**: Button share countdown lên social media
5. **Multiple Countdowns**: Đếm nhiều sự kiện cùng lúc
6. **Dark Mode**: Theme switcher
7. **i18n**: Đa ngôn ngữ (English, Vietnamese)
8. **Testing**: Unit tests với Vitest

## 📝 License

MIT - Tự do sử dụng cho mục đích học tập

## 🙏 Acknowledgments

- Thiết kế dựa trên best practices của Vue.js
- Dữ liệu lịch âm từ lịch Việt Nam chính thống
- Học từ Vue.js documentation và community

---

**Happy Learning! 🎉**

Nếu có câu hỏi hoặc muốn đóng góp, hãy mở issue hoặc pull request!
