<script setup lang="ts">
import store from '../store';
import { computed } from "vue";

const results = computed(() => store.state.results);

</script>

<template>
    <div v-for="result in results" :key="result">
        <p>{{result}}</p>
    </div>
</template>

<style>

p {
    height: 10vh;
    border: 1px solid;
    border-radius: 5px;
    padding: 10px;
}

</style>