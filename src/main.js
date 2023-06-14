import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

createApp(App).use(router).mount('#app')
