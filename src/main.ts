// import { createApp } from 'vue'
// import App from './App.vue'
// import './style.css'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupQueryPlugin } from './plugins/query'
import './style.css'

const app = createApp(App)

// Setup Vue Router
app.use(router)

// Setup TanStack Query
setupQueryPlugin(app)

// Mount app
app.mount('#app')
