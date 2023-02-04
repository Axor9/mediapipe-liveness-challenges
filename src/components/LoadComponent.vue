<script setup lang="ts"></script>

<template>
    <div class="load-container">
        <div id="load-container-div">
            <div
                class="spinner-border"
                role="status"
                style="width: 3rem; height: 3rem"
            >
                <span class="visually-hidden">Loading...</span>
            </div>
            <b id="load">Cargando...</b>
        </div>
    </div>
</template>

<style>
.load-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#load {
    margin-top: 5px;
    display: block;
}
</style>
