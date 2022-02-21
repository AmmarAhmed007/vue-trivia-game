<script setup lang="ts">
import store from '../store';
import { computed } from "vue";

const answers = computed(() => store.state.answers);

const results = computed(() => store.state.results);


</script>

<template>
    <div v-for="(answer, index) in answers" key="index">
        <p>Correct: {{answer}} <br> You Answered: {{results[index]}}</p>
    </div>
</template>

<style>

p {
    border: 1px solid;
    height: 15vh;
    padding: 10px;
}
</style>