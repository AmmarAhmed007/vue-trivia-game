<script setup lang="ts">
import 'animate.css'
import { computed, Events, reactive, ref } from "vue";
import { useStore } from "vuex";
import router from "../router";
import { fetchTriviaQuestions, Trivia } from "../api/questions"

// global variables
const triviaType = { boolean: 'boolean', multiple: 'multiple' };
let correct_trivia_answer = "";
let answeredTrivia = false;
let booleanTrivia = false;
let questions: string[] = [];
let userAnswers: string[] = [];
let correctAnswers: string[] = [];

// set reactive and ref variables from vue
const triviaQuestions = reactive<Trivia[]>([]);
let triviaQuestion = ref<string>("");
let triviaAnswers = ref<string[]>([]);
let triviaScore = ref<number>(0);
let triviaCount = ref<number>(0);

// get state variables from vuex store
const store = useStore();
const userName = computed(() => store.state.userName);
const amount = computed(() => store.state.triviaParams.amount);
const category = computed(() => store.state.triviaParams.category);
const difficulty = computed(() => store.state.triviaParams.difficulty);

(async function () {
    // fetch trivia questions from API using amount and difficulty params as parameters
    const [error, questions] = await fetchTriviaQuestions(amount.value, category.value, difficulty.value);
    console.log(questions);
    console.log(error);

    // add a copy of trivia questions to global variable
    triviaQuestions.push(...questions);

    // get and display first trivia question with answers
    getTrivia();
})();

const nextQuestion = () => {
    if (triviaCount.value < amount.value) {
        answeredTrivia = false;
        booleanTrivia = false;
        getTrivia();
    } else {
        store.commit("setTriviaQuestions", questions);
        store.commit("setTriviaAnswers", correctAnswers);
        store.commit("setUserAnswers", userAnswers);
        store.commit("setScore", triviaScore.value);
        router.push("/result");
    }
}

function getTrivia() {
    const { question, correct_answer, incorrect_answers, type } = triviaQuestions[triviaCount.value];

    // assign current trivia question and correct answer to global variables
    triviaQuestion.value = question;
    correct_trivia_answer = correct_answer;

    // add current trivia question and correct answer to global arrays
    questions.push(question);
    correctAnswers.push(correct_answer);

    // reset, push and sort all current trivia answers
    triviaAnswers.value = [];
    triviaAnswers.value.push(...incorrect_answers, correct_answer);
    triviaAnswers.value.sort();

    // set booleanTrivia as true if boolean trivia type
    if (type === triviaType.boolean) booleanTrivia = true;

    enableAnswerButtons();
    resetAnswerBtnColors();

    triviaCount.value += 1;
}

function getAnswerBtnValue(e: any) {

    const userAnswer: string = e.target.innerHTML;

    userAnswers.push(userAnswer);

    console.log("Button value " + userAnswer);

    const answer = <HTMLInputElement>document.getElementById(e.target.id);

    if (userAnswer === correct_trivia_answer) {
        answer.style.backgroundColor = "green";
        triviaScore.value += 10;
    } else {
        const { answer1, answer2, answer3, answer4 } = getButtonElements();
        const answers = [answer1, answer2, answer3, answer4];
        answers.forEach(element => {
            if (element.innerHTML === correct_trivia_answer) element.style.backgroundColor = "green"
        });
        answer.style.backgroundColor = "red";
    }

    answeredTrivia = true;
    enableAnswerButtons();
}

function enableAnswerButtons() {
    const { answer1, answer2, answer3, answer4, next } = getButtonElements();
    // disable answer button if answered trivia, or else enable button for answering
    answeredTrivia ? answer1.disabled = true : answer1.disabled = false;
    answeredTrivia ? answer2.disabled = true : answer2.disabled = false;
    answeredTrivia ? answer3.disabled = true : answer3.disabled = false;
    answeredTrivia ? answer4.disabled = true : answer4.disabled = false;

    // enable next button if trivia answered, or else disable button
    answeredTrivia ? next.disabled = false : next.disabled = true;

    // hide two answer buttons if boolean trivia question, or else unhide
    booleanTrivia ? answer3.hidden = true : answer3.hidden = false;
    booleanTrivia ? answer4.hidden = true : answer4.hidden = false;
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

</script>


<template>
    <div class="container animate__animated animate__zoomInUp" style="border:solid">
        <div id="question-container" class="hide"></div>
        <div class="questions-counter">
            Question: {{ triviaCount }} / {{ amount }} &emsp; &emsp; &emsp;
            Username: {{ userName }} &emsp; &emsp; &emsp;
            Score: {{ triviaScore }} &emsp; &emsp; &emsp;
            Difficulty: {{ difficulty }}
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
    background-color: #f4511e;
}

.questions-counter {
    text-align: center;
}
</style>