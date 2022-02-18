<script setup lang="ts">
import { reactive, ref } from "vue";
import { fetchAllQuestions, selectDifficulty, selectType } from "../api/questions"


const difficulty = { easy: 'easy', medium: 'medium', hard: 'hard' };
const type = { boolean: 'boolean', multiple: 'multiple'};


selectDifficulty(difficulty.hard);

selectType(type.boolean);

const [_error, _questions] = await fetchAllQuestions();
console.log(_questions);
console.log(_error);

</script>

<template>
    <h1>Hello Question</h1>
</template>