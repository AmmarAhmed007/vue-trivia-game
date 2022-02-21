<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { routerKey } from "vue-router";
import VueRouter from 'vue-router'
import { useStore } from "vuex";
import { fetchTriviaQuestions, Trivia } from "../api/questions"
import router from "../router";
import 'animate.css'

// const _amount = { five: "5", ten: "10", fifteen: "15" }
// const _difficulty = { easy: 'easy', medium: 'medium', hard: 'hard' };
const _type = { boolean: 'boolean', multiple: 'multiple' };

//const userName = ref<string>("gingerbread")
const triviaQuestions = reactive<Trivia[]>([]);
let triviaQuestion = ref<string>("");
let triviaAnswers = ref<string[]>([]);
let triviaScore = ref<number>(0);
let triviaCount = ref<number>(0);   

let userAnswers: string[] = [];

const store = useStore();

const userName = computed(() => store.state.userName);

const amount = computed(() => store.state.triviaParams.amount);
const difficulty = computed(() => store.state.triviaParams.difficulty);



let answeredTrivia = false;

let correct_trivia_answer = "";

(async function () {


    // console.log(store.getters.userName);


    const [error, questions] = await fetchTriviaQuestions(amount.value, difficulty.value);
    console.log(questions);
    console.log(error);

    triviaQuestions.push(...questions);

    getTrivia();
    triviaCount.value += 1;
})();

const nextQuestion = () => {

    if (triviaCount.value < triviaQuestions.length) {
        triviaCount.value += 1;
        getTrivia();
    } else {
        router.push("/result");
    }
}

function getTrivia() {
    const { question, correct_answer, incorrect_answers, type } = triviaQuestions[triviaCount.value];

    triviaQuestion.value = question;

    triviaAnswers.value = [];

    triviaAnswers.value.push(correct_answer);
    triviaAnswers.value.push(...incorrect_answers);

    triviaAnswers.value.sort();

    if (type === _type.boolean) {
        // hide answers (buttons) 3 & 4 from html
        hideAnswerButtons();
    }

    const { next } = getButtonElements();
    next.style.backgroundColor = "orange";



    correct_trivia_answer = correct_answer;

    answeredTrivia = false;

    enableAnswerButtons();
    resetAnswerBtnColors();
}

function getAnswerBtnValue(e) {

    const userAnswer: string = e.target.innerHTML;

    userAnswers.push(userAnswer);

    console.log("Button value " + userAnswer)
    // disableAnswerButtons();

    const answer = <HTMLInputElement>document.getElementById(e.target.id)

    if (userAnswer === correct_trivia_answer) {
        answer.style.backgroundColor = "green";
    } else {
        const { answer1, answer2, answer3, answer4 } = getButtonElements();
        const answers = [answer1, answer2, answer3, answer4];
        answers.forEach(element => {
            if (element.innerHTML === correct_trivia_answer) element.style.backgroundColor = "green"
        });
        answer.style.backgroundColor = "red";
    }

    //checkTriviaAnswer()

    answeredTrivia = true;
    enableAnswerButtons();
}

function enableAnswerButtons() {
    const { answer1, answer2, answer3, answer4 } = getButtonElements();
    // disable answer button if answered trivia, or else enable button for answering
    answeredTrivia ? answer1.disabled = true : answer1.disabled = false;
    answeredTrivia ? answer2.disabled = true : answer2.disabled = false;
    answeredTrivia ? answer3.disabled = true : answer3.disabled = false;
    answeredTrivia ? answer4.disabled = true : answer4.disabled = false;
}

function hideAnswerButtons() {
    const { answer3, answer4 } = getButtonElements();

    answer3.hidden = true;
    answer4.hidden = true;
}

function getButtonElements() {
    return {
        answer1: <HTMLInputElement>document.getElementById('ans1'),
        answer2: <HTMLInputElement>document.getElementById('ans2'),
        answer3: <HTMLInputElement>document.getElementById('ans3'),
        answer4: <HTMLInputElement>document.getElementById('ans4'),
        next: <HTMLInputElement>document.getElementById('next'),
    }
}

function resetAnswerBtnColors() {
    const { answer1, answer2, answer3, answer4 } = getButtonElements();
    // reset to default background color
    answer1.style.backgroundColor = "blue";
    answer2.style.backgroundColor = "blue";
    answer3.style.backgroundColor = "blue";
    answer4.style.backgroundColor = "blue";
}

function checkTriviaAnswer() {
    const { next } = getButtonElements();

    next.disabled = false;
}


</script>


<template>
    <div class="container animate__animated animate__zoomInUp" style="border:solid">
        <div id="question-container" class="hide"></div>
        <div class="questions-counter">
            Question: {{ triviaCount }} / {{ amount }} &emsp; &emsp; &emsp;
            Username: {{ userName }} &emsp; &emsp; &emsp;
            Score: {{ triviaScore }} / {{ amount * 10}} &emsp; &emsp; &emsp;
            Difficulty: {{difficulty}}
        </div>
        <div class="questions">{{ triviaQuestion }}</div>
        <div id="answers" class="btn-grid">
            <button @click="getAnswerBtnValue" class="btn" id="ans1">{{ triviaAnswers[0] }}</button>
            <button @click="getAnswerBtnValue" class="btn" id="ans2">{{ triviaAnswers[1] }}</button>
            <button @click="getAnswerBtnValue" class="btn" id="ans3">{{ triviaAnswers[2] }}</button>
            <button @click="getAnswerBtnValue" class="btn" id="ans4">{{ triviaAnswers[3] }}</button>
        </div>
        <button @click.prevent="nextQuestion" class="nextButton btn" id="next">Next Question</button>
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
    font-size: 25px;
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

.questions-counter {
    text-align: center;
}
</style>