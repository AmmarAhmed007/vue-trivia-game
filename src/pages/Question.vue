<script setup lang="ts">
import { reactive, ref } from "vue";
import { fetchAllQuestions } from "../api/questions"

const difficulty = { easy: 'easy', medium: 'medium', hard: 'hard' };
const type = { boolean: 'boolean', multiple: 'multiple'};

const [error, questions] = await fetchAllQuestions("10", difficulty.easy, type.multiple);
console.log(questions);
console.log(error);

for (const trivia of questions) {
    const { question, correct_answer, incorrect_answers } = trivia;

    console.log("-----------------------------------------------");
    console.log("QUESTION: " + question);
    console.log("ANSWER: " + correct_answer);
    console.log("WRONGS: " + incorrect_answers);
}

</script>

<template>
    <h1>Hello Question</h1>
</template>