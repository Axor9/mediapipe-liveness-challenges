<script setup lang="ts">
import { ref } from 'vue'

const loaded = ref<boolean>(false)
</script>

<template>
    <div class="home">
        <LoadComponent v-if="!loaded" />
        <div class="detector-container" v-show="loaded">
            <CameraComponent @loaded="loaded = !loaded" />
            <ChallengeComponent />
        </div>
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

.home {
    width: 100%;
    height: 100%;
}

.detector-container {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
