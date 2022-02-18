<script setup lang="ts">
import { reactive, ref } from "vue";
import { fetchAllQuestions } from "../api/questions"

const difficulty = { easy: 'easy', medium: 'medium', hard: 'hard' };
const type = { boolean: 'boolean', multiple: 'multiple'};

const [error, questions] = await fetchAllQuestions(difficulty.easy, type.boolean);
console.log(questions);
console.log(error);

</script>

<template>
    <h1>Hello Question</h1>
</template>