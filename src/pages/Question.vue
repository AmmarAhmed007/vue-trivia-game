<script setup lang="ts">
// import { reactive, ref } from "vue";
import { fetchTriviaQuestions } from "../api/questions"

const amount = { five: "5", ten: "10", fifteen: "15" }
const difficulty = { easy: 'easy', medium: 'medium', hard: 'hard' };
const type = { boolean: 'boolean', multiple: 'multiple' };

const [error, questions] = await fetchTriviaQuestions(amount.ten, difficulty.medium, type.multiple);
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
    <div class="grid-container" style="border:solid">
        <div id="question-container" class="hide"></div>
        <div class="questions"></div>
        <div id="answers" class="btn-grid">
            <button class="btn">Answer 1</button>
            <button class="btn">Answer 2</button>
            <button class="btn">Answer 3</button>
            <button class="btn">Answer 4</button>
        </div>
    </div>
</template>