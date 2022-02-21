<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { routerKey } from "vue-router";
import VueRouter from 'vue-router'
import { useStore } from "vuex";
import { fetchTriviaQuestions, Trivia } from "../api/questions"
import router from "../router";
import 'animate.css'

const _amount = { five: "5", ten: "10", fifteen: "15" }
const _difficulty = { easy: 'easy', medium: 'medium', hard: 'hard' };
const _type = { boolean: 'boolean', multiple: 'multiple' };

//const userName = ref<string>("gingerbread")
const triviaQuestions = reactive<Trivia[]>([]);
let triviaQuestion = ref<string>("");
let triviaAnswers = ref<string[]>([]);
let triviaScore = ref<number>(0);
let triviaCount = ref<number>(0);

let userAnswers: string[] = [];

const store = useStore();
//store.commit("setUserName", {user:user.value}) 

 const userName = computed(() => store.state.userName);


//const _userName = store.getters.userName;


//console.log(_userName);



(async function () {

    
   // console.log(store.getters.userName);
    

    const [error, questions] = await fetchTriviaQuestions(_amount.five, _difficulty.easy);
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
        // todo: hide answers (buttons) 3 & 4 from html
        alert(_type.boolean + " type!");
    }
}


</script>


<template>
    <div class="container animate__animated animate__zoomInUp" style="border:solid">
        <div id="question-container" class="hide"></div>
        <div class="questions-counter">
            Question: {{ triviaCount }} / {{ triviaQuestions.length }} &emsp; &emsp; &emsp;
            Username: {{ userName }} &emsp; &emsp; &emsp;
            Score: {{ triviaScore }} / {{ triviaQuestions.length }}
        </div>
        <div class="questions">{{ triviaQuestion }}</div>
        <div id="answers" class="btn-grid">
            <button class="btn">{{ triviaAnswers[0] }}</button>
            <button class="btn">{{ triviaAnswers[1] }}</button>
            <button class="btn" id="ans3">{{ triviaAnswers[2] }}</button>
            <button class="btn" id="ans4">{{ triviaAnswers[3] }}</button>
        </div>
        <button @click.prevent="nextQuestion" class="nextButton btn">Next Question</button>
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