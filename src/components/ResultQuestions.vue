<script setup lang="ts">
import store from '../store';
import { computed } from "vue";

    const questions = computed(() => store.state.questions);

</script>

<template>
    <div v-for="question in questions" key="question">
        <p>{{question}}</p>
    </div>
</template>

<style>

p {
    border: 1px solid;
    height: 15vh;
    padding: 10px;
}
</style>