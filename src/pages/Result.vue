<script setup lang="ts">
import 'animate.css'
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import UserResultStats from '../components/ResultQuestions.vue'
import UserResultAnswerInput from '../components/ResultUserAnswers.vue';
import UserResultCorrectAnswer from '../components/ResultCorrectAnswers.vue';
import UserResultQuestion from '../components/ResultQuestions.vue';
import ResultUserAnswers from '../components/ResultUserAnswers.vue';
import ResultCorrectAnswers from '../components/ResultCorrectAnswers.vue';
import ResultQuestions from '../components/ResultQuestions.vue';

const store = useStore();

const questions = computed(() => store.state.questions);
const questionAnswers = computed(() => store.state.answers);
const userAnswers = computed(() => store.state.results);

console.log(questions.value);
console.log(questionAnswers.value);
console.log(userAnswers.value);

function listUserStat() {

}

</script>

<template>
    <div class="main">
        <div class="result2 shadow-lg shadow-black">
            <div class="header animate__animated animate__tada">
                <h2>High Scores</h2>
            </div>

            <div class="grid-container">
                <div class="grid-item username animate__animated animate__bounceInLeft">Username</div>
                <div class="grid-item score animate__animated animate__bounceInLeft">Score</div>
                <!-- <table>
                    <tr>
                        <th class="username animate__animated animate__bounceInLeft">Username</th>
                        <th class="score animate__animated animate__bounceInLeft">Score</th>
                    </tr>
                </table>-->
            </div>
        </div>

        <div class="result shadow-lg shadow-black">
            <h2 style="text-align:center">Your Stats</h2> <br>
            <div class="header" style="display:inline-flex" >
                
                <div style="display:inline-block; width: 60%;">
                <h5 class="animate__animated animate__tada">Question</h5>
                    <ResultQuestions />
                </div>
                <div style="width: 20%;">
                    <h5 class="animate__animated animate__tada">Correct Answer</h5>
                    <ResultCorrectAnswers />
                </div>
                <div style="width: 20%;">
                    <h5 class="animate__animated animate__tada">Your Answer</h5>
                    <ResultUserAnswers />
                </div>
            </div>
        </div>

        <div>
            <router-link to="/">
                <button class="btn1 btn" type="submit">Back to start</button>
            </router-link>
            <router-link to="/question">
                <button class="btn2 btn" type="submit">Replay</button>
            </router-link>
        </div>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
}

.grid-container {
    display: grid;
    text-align: center;
    float: left;
}

.username {
    grid-column: 1;
    font-weight: bold;
}

.score {
    grid-column: 2;
    font-weight: bold;
}

.result {
    width: 80%;
    height: 80vh;
    padding: 10px;
    float: left;
    margin: 30px;
    overflow: scroll;
}

.result2 {
    width: 20%;
    height: 80vh;
    padding: 10px;
    float: left;
    margin: 30px;
}

.header {
    text-align: center;
}

.btn1 {
    grid-column: 1;
    position: absolute;
    top: 10px;
    right: 10px;
}

.btn2 {
    grid-column: 2;
    position: absolute;
    top: 10px;
    left: 50px;
}

.main {
    display: flex;
}
</style>
