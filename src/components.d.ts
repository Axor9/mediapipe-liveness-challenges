import CameraComponent from './components/CameraComponent.vue'
import LoadComponent from '@/components/LoadComponent.vue'
import ChallengeComponent from '@/components/ChallengeComponent.vue'

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        CameraComponent: typeof CameraComponent
        LoadComponent: typeof LoadComponent
        ChallengeComponent: typeof ChallengeComponent
    }
}
