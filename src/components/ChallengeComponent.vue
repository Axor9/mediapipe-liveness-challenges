<script setup lang="ts">
import { checkInsideArea, checkDistanceArea, contains } from '@/utils/functions'
import { watch } from '@vue/runtime-core'
import { useStore } from '@/store'
import { ref } from 'vue'
import { smileDetection } from '@/utils/smileDetection'
import { faceLeftRight, faceBottomTop } from '@/utils/faceMoveDetection'
import { blinkDetection, leftBlink, rightBlink } from '@/utils/blinkDetection'

const store = useStore()

const blinkCount = ref<number>(0)
const leftBlinkCount = ref<number>(0)
const rightBlinkCount = ref<number>(0)

const blinkFrames = ref<number>(0)
const blinkFramesConst = ref<number>(5)

const msg = ref<string>('Center your face within the area')
const challenge = ref<ChallengeTypes>('blink')

watch(
    () => store.state.landmarks,
    function () {
        if (
            checkInsideArea(
                store.state.faceArea,
                store.state.landmarks.faceLandmarks
            )
        ) {
            store.commit('setFaceAreaColor', '#42f545')
            if (
                checkDistanceArea(
                    store.state.faceArea,
                    store.state.landmarks.boundingBox
                )
            ) {
                checkChallenge(store.state.landmarks)
            } else {
                msg.value = 'Get closer to the camera'
            }
        } else {
            store.commit('setFaceAreaColor', 'red')
            msg.value = 'Center your face within the area'
        }
    }
)

function checkChallenge(landmarks: Landmarks) {
    if (challenge.value === 'smile') {
        if (smileDetection(landmarks.lipsLandmarks, landmarks.faceLandmarks)) {
            msg.value = 'Smiling'
        } else {
            msg.value = 'Not smiling'
        }
    }

    if (challenge.value === 'face') {
        const leftRight = faceLeftRight(
            landmarks.noseLandmarks,
            landmarks.faceLandmarks
        )
        const bottomTop = faceBottomTop(
            landmarks.noseLandmarks,
            landmarks.faceLandmarks
        )

        msg.value = `${leftRight} // ${bottomTop}`
    }

    if (challenge.value === 'blink') {
        msg.value = 'Blink to complete the challenge'

        if (blinkFrames.value >= blinkFramesConst.value) {
            if (
                blinkDetection(
                    landmarks.leftEyeLandmarks,
                    landmarks.rightEyeLandmarks
                )
            ) {
                blinkCount.value++
                blinkFrames.value = 0
            }

            if (
                leftBlink(
                    landmarks.leftEyeLandmarks,
                    landmarks.rightEyeLandmarks
                )
            ) {
                leftBlinkCount.value++
                blinkFrames.value = 0
            }

            if (
                rightBlink(
                    landmarks.leftEyeLandmarks,
                    landmarks.rightEyeLandmarks
                )
            ) {
                rightBlinkCount.value++
                blinkFrames.value = 0
            }
        } else {
            blinkFrames.value++
        }
    }

    if (challenge.value === 'nose') {
        msg.value = 'Place your nose inside the orange area'

        if (contains(store.state.noseChallenge, landmarks.noseLandmarks)) {
            console.log('hola')
            store.commit('setIsNoseChallenge', false)
        }
    }
}

function changeChallenge(c: ChallengeTypes) {
    challenge.value = c

    if (c === 'nose') {
        store.commit('setIsNoseChallenge', true)
    } else {
        store.commit('setIsNoseChallenge', false)
    }

    blinkCount.value = 0
    leftBlinkCount.value = 0
    rightBlinkCount.value = 0
}

function generateNoseChallenge() {
    store.commit('setIsNoseChallenge', true)
}
</script>

<template>
    <div id="text-container">
        <div
            class="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
        >
            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                @click="changeChallenge('nose')"
            />
            <label class="btn btn-outline-primary" for="btnradio1"
                >Nose Challenge</label
            >

            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
                checked
                @click="changeChallenge('blink')"
            />
            <label class="btn btn-outline-primary" for="btnradio2"
                >Blink Challenge</label
            >

            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio3"
                autocomplete="off"
                @click="changeChallenge('smile')"
            />
            <label class="btn btn-outline-primary" for="btnradio3"
                >Smile Challenge</label
            >

            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio4"
                autocomplete="off"
                @click="changeChallenge('face')"
            />
            <label class="btn btn-outline-primary" for="btnradio4"
                >Face Challenge</label
            >
        </div>
        <div id="msg-div">
            <b>{{ msg }}</b>
            <b v-if="challenge === 'blink'">Blink count: {{ blinkCount }}</b>
            <b v-if="challenge === 'blink'"
                >Left blink count: {{ leftBlinkCount }}</b
            >
            <b v-if="challenge === 'blink'"
                >Right blink count: {{ rightBlinkCount }}</b
            >
            <button v-if="challenge === 'nose'" @click="generateNoseChallenge">
                Generate
            </button>
        </div>
    </div>
</template>

<style>
#text-container {
    width: 40%;
    align-self: center;
    word-wrap: break-word;
    margin: 20px;
    display: flex;
    flex-direction: column;
    height: 60%;
}

#msg-div {
    margin-top: 30%;
}

#msg-div b {
    height: 70%;
    text-align: center;
    font-size: larger;
    display: block;
}
</style>
