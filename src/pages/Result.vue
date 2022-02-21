<script setup lang="ts">
import 'animate.css'
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import UserResultStats from '../components/UserResultStats.vue'

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
        <div class="result shadow-lg shadow-black">
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
                </table> -->
            </div>
        </div>

        <div class="result shadow-lg shadow-black">
            <div class="header">
                <h2>Your Stats</h2>
                <UserResultStats />
                <!-- <p>{{ questions }}</p>
                <br />
                <p>{{ questionAnswers }}</p>
                <br />
                <p>{{ userAnswers }}</p> -->
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
    width: 60vh;
    height: 60vh;
    padding: 10px;
    float: left;
    margin: 30px;
}

.header {
    text-align: center;
}

.btn1 {
    grid-column: 1;
}

.btn2 {
    grid-column: 2;
}

.main {
    display: flex;
}
</style>
