import { createApp } from 'vue'
import './polyfills'
import './style.css'
import App from './App.vue'

const app = createApp(App)
//
// app.component('RecycleScroller', RecycleScroller)
//
app.mount('#app')
