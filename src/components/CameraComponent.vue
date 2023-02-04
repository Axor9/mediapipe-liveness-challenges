<script setup lang="ts">
import { Camera } from '@mediapipe/camera_utils'
import FaceDetector from '@/models/faceDetector'
import { onMounted, ref, watch } from 'vue'
import { useStore } from '@/store'

const store = useStore()

const emit = defineEmits<{
    (e: 'loaded'): void
}>()

const videoElement = ref<HTMLVideoElement>()
const canvasElement = ref<HTMLCanvasElement>()
const canvasFaceArea = ref<HTMLCanvasElement>()
const canvasChallenge = ref<HTMLCanvasElement>()

const width = ref<number>(640)
const height = ref<number>(480)

const faceArea = ref<Rect>({
    x: width.value / 2 - (width.value * 0.4) / 2,
    y: height.value / 2 - (height.value * 0.6) / 2,
    width: width.value * 0.4,
    height: height.value * 0.6,
})
store.state.faceArea = faceArea.value

const noseChallengeArea = ref<Rect>({
    x: width.value / 2 - (width.value * 0.2) / 2,
    y: height.value / 2 - (height.value * 0.25) / 2 + height.value * 0.25 * 0.2,
    width: width.value * 0.2,
    height: height.value * 0.25,
})

const faceDetector: FaceDetector = new FaceDetector({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
})

watch(
    () => store.state.faceAreaColor,
    function () {
        drawFaceArea(store.state.faceAreaColor)
    }
)

watch(
    () => store.state.isNoseChallenge,
    function () {
        if (store.state.isNoseChallenge) {
            drawNoseChallenge()
        } else {
            const canvasCh = canvasChallenge.value?.getContext('2d')

            if (canvasCh) {
                canvasCh.clearRect(0, 0, width.value, height.value)
            }
        }
    }
)

onMounted(async () => {
    if (videoElement.value) {
        const camera: Camera = new Camera(videoElement.value, {
            onFrame: async () => {
                if (videoElement.value) {
                    const results = await faceDetector.detectFace(
                        videoElement.value
                    )
                    if (results) store.commit('setLandmarks', results)
                }
            },
            width: width.value,
            height: height.value,
        })
        await camera.start()
        startCamera()
        emit('loaded')
    }
})

function startCamera() {
    const canvasArea = canvasFaceArea.value?.getContext('2d')

    if (canvasArea) {
        canvasArea.clearRect(0, 0, width.value, height.value)
        canvasArea.globalAlpha = 0.2
        canvasArea.fillStyle = 'black'
        canvasArea.fillRect(0, 0, width.value, height.value)
        canvasArea.globalAlpha = 1

        drawFaceArea('red')
    }
}

function drawFaceArea(color: string) {
    const canvasArea = canvasFaceArea.value?.getContext('2d')
    if (canvasArea) {
        canvasArea.strokeStyle = color
        canvasArea.lineWidth = 2
        canvasArea.clearRect(
            faceArea.value.x,
            faceArea.value.y,
            faceArea.value.width,
            faceArea.value.height
        )
        canvasArea.strokeRect(
            faceArea.value.x,
            faceArea.value.y,
            faceArea.value.width,
            faceArea.value.height
        )
    }
}

function drawNoseChallenge() {
    const challengeRect: Rect = {
        x:
            noseChallengeArea.value.x +
            Math.random() * noseChallengeArea.value.width,
        y:
            noseChallengeArea.value.y +
            Math.random() * noseChallengeArea.value.height,
        width: faceArea.value.width * 0.05,
        height: faceArea.value.width * 0.05,
    }

    if (
        challengeRect.x >
        noseChallengeArea.value.x +
            noseChallengeArea.value.width -
            challengeRect.width
    ) {
        challengeRect.x = challengeRect.x - challengeRect.width
    }

    if (
        challengeRect.y >
        noseChallengeArea.value.y +
            noseChallengeArea.value.height -
            challengeRect.height
    ) {
        challengeRect.y = challengeRect.y - challengeRect.height
    }

    store.commit('setNoseChallenge', challengeRect)

    const canvasCh = canvasChallenge.value?.getContext('2d')
    if (canvasCh) {
        canvasCh.clearRect(0, 0, width.value, height.value)
        canvasCh.strokeStyle = '#e3a622'
        canvasCh.lineWidth = 2
        canvasCh.strokeRect(
            challengeRect.x,
            challengeRect.y,
            challengeRect.width,
            challengeRect.height
        )
    }
}
</script>

<template>
    <div class="canvas">
        <video ref="videoElement" id="videoElement"></video>
        <canvas
            ref="canvasElement"
            id="canvasElement"
            :width="width"
            :height="height"
        ></canvas>
        <canvas
            ref="canvasFaceArea"
            id="canvasFaceArea"
            :width="width"
            :height="height"
        ></canvas>
        <canvas
            ref="canvasChallenge"
            id="canvasChallenge"
            :width="width"
            :height="height"
        ></canvas>
    </div>
</template>

<style>
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

.canvas {
    align-self: center;
    width: 50%;
    margin: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#canvasElement,
#canvasChallenge,
#videoElement,
#canvasFaceArea {
    position: absolute;
    width: 640px;
    height: 480px;
}
</style>
