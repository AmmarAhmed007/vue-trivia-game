<script setup lang="ts">
import store from '../store';
import { computed, reactive, ref } from "vue";


function listUserResult() {


    questions.value.forEach(element => {
        
    });
}

    const questions = computed(() => store.state.questions);
    const answers = computed(() => store.state.answers);
     const results = computed(() => store.state.results);

</script>

<template>
    <div v-for="(question, index) in questions" key="index">
        <p>Trivia question: {{question}}</p>
        <p>Correct answer: {{answers[index]}}</p>
        <p>Your answer: {{results[index]}}</p>
    </div>
</template>