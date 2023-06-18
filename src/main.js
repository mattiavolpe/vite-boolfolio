import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faChevronDown)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
