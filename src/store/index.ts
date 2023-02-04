import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export interface State {
    landmarks: Landmarks
    faceArea: Rect
    faceAreaColor: string
    noseChallenge: Rect
    isNoseChallenge: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        landmarks: {
            faceLandmarks: [],
            leftEyeLandmarks: [],
            lipsLandmarks: [],
            rightEyeLandmarks: [],
            boundingBox: {
                xMax: 0,
                yMax: 0,
                xMin: 0,
                yMin: 0,
            },
            noseLandmarks: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        },
        faceArea: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
        faceAreaColor: 'red',
        noseChallenge: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
        isNoseChallenge: false,
    },
    mutations: {
        setLandmarks: (state, landmark) => (state.landmarks = landmark),
        setFaceArea: (state, faceArea) => (state.faceArea = faceArea),
        setFaceAreaColor: (state, color) => (state.faceAreaColor = color),
        setNoseChallenge: (state, nose) => (state.noseChallenge = nose),
        setIsNoseChallenge: (state, flag) => (state.isNoseChallenge = flag),
    },
    actions: {},
    modules: {},
})

export function useStore() {
    return baseUseStore(key)
}
