import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

import CameraComponent from './components/CameraComponent.vue'
import LoadComponent from '@/components/LoadComponent.vue'
import ChallengeComponent from '@/components/ChallengeComponent.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

createApp(App)
    .use(store, key)
    .use(router)
    .component('CameraComponent', CameraComponent)
    .component('LoadComponent', LoadComponent)
    .component('ChallengeComponent', ChallengeComponent)
    .mount('#app')
