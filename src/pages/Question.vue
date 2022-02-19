<script setup lang="ts">
import { reactive, ref } from "vue";
import { fetchTriviaQuestions, Trivia } from "../api/questions"

const amount = { five: "5", ten: "10", fifteen: "15" }
const difficulty = { easy: 'easy', medium: 'medium', hard: 'hard' };

// const userName = ref<string>("gingerbread")
const triviaQuestions = reactive<Trivia[]>([]);
let triviaQuestion = ref<string>("");
let triviaAnswers = ref<string[]>([]);
let triviaCount = ref<number>(0);

(async function () {

    const [error, questions] = await fetchTriviaQuestions(amount.ten, difficulty.medium);
    console.log(questions);
    console.log(error);

    triviaQuestions.push(...questions);

    const { question, correct_answer, incorrect_answers } = triviaQuestions[0];

    triviaQuestion.value = question;

    triviaAnswers.value.push(correct_answer);
    triviaAnswers.value.push(...incorrect_answers);

    triviaAnswers.value.sort();

})();

function getTriviaQuestions() {
    for (const trivia of triviaQuestions) {
        const { question, correct_answer, incorrect_answers } = trivia;

        console.log("-----------------------------------------------");
        console.log("QUESTION: " + question);
        console.log("ANSWER: " + correct_answer);
        console.log("WRONGS: " + incorrect_answers);
    }
}

</script>

<template>
    <div class="container" style="border:solid">
        <div id="question-container" class="hide"></div>
        <div class="questions-counter">Question {{triviaCount}} / {{triviaQuestions.length}} </div>
        <div class="questions">{{triviaQuestion}}</div>
        <div id="answers" class="btn-grid">
            <button class="btn">Answer 1: {{triviaAnswers[0]}}</button>
            <button class="btn">Answer 2: {{triviaAnswers[1]}}</button>
            <button class="btn">Answer 3: {{triviaAnswers[2]}}</button>
            <button class="btn">Answer 4: {{triviaAnswers[3]}}</button>
        </div>
        <button type="submit" class="nextButton btn">Next Question</button>
    </div>
</template>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {
    --hue-neutral: 200;
    --hue-wrong: 0;
    --hue-correct: 145;
}

body {
    --hue: var(--hue-neutral);
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: hsl(--hue), 100%, 20%;
}

body.correct {
    --hue: var(--hue-correct);
}

.container {
    width: 1000px;
    max-width: 80%;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 10px 2px;
    height: 300px;
    max-height: 30%;
}

.btn-grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 15px;
    margin: 20px 0;
}

.btn {
    --hue: var(--hue-neutral);
    background-color: hsl(var(--hue), 100%, 50%);
    border: 2px solid hsl(var(--hue), 100%, 30%);
    border-radius: 5px;
    padding: 5px 10px;
    outline: none;
}

.questions {
    text-align: center;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 40px;
    border: 1px solid;
    border-radius: 5px;
}

.btn:hover {
    border-color: black;
}

.btn.correct {
    --hue: var(--hue-correct);
}

.btn.wrong {
    --hue: var(--hue-wrong);
}

.nextButton {
    float: right;
    padding-top: 10px;
    width: 100%;
    background-color: darksalmon;
}
</style>