import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js';
import toast from 'vue3-toastify'

createApp(App)
    .use(router)
    .use(toast, {
        position: 'top-center'
    })
    .mount('#app')
