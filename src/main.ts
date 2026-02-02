/**
 * main.ts - Application Entry Point
 * 
 * File khởi tạo Vue application
 * 
 * Kiến thức Vue:
 * - createApp(): Tạo Vue app instance
 * - mount(): Gắn app vào DOM element
 */

import { createApp } from 'vue';
import App from './App.vue';
import './styles/animations.css';

// Tạo Vue app instance
const app = createApp(App);

// Mount app vào element #app trong index.html
app.mount('#app');

// Development logging
if (import.meta.env.DEV) {
  console.log('🎊 Countdown to Tết App initialized!');
  console.log('📚 Learning Vue 3 Composition API');
}
