<script setup lang="ts">
import { reactive, ref } from "vue";
import { fetchAllQuestions } from "../api/questions"

const difficulty = { easy: 'easy', medium: 'medium', hard: 'hard' };
const type = { boolean: 'boolean', multiple: 'multiple'};

const [_error, _questions] = await fetchAllQuestions(difficulty.hard, type.multiple);
console.log(_questions);
console.log(_error);

</script>

<template>
    <h1>Hello Question</h1>
</template>