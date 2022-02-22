<script setup lang="ts">
import 'animate.css'
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import ResultAnswers from '../components/ResultAnswers.vue';
import ResultQuestions from '../components/ResultQuestions.vue';
import { apiFetchUsers, UserResponse } from "../api/users";

const store = useStore();

const userName = computed(() => store.state.user.name);
const userScore = computed(() => store.state.user.score);

const users = reactive<UserResponse[]>([]);
// const name = ref("");
// const score = ref("");

// name.value = userName.value;
// score.value = userScore.value;



onMounted(() => {
    //store.dispatch("fetchUsers")
    (async function () {
        const apiUsers = await apiFetchUsers();

        console.log(apiUsers);

                users.push(...apiUsers);
    })();
    
});

// (async function () {
//     const apiUsers = await apiFetchUsers();
//     console.log(apiUsers.values);

//     users.push(...apiUsers);
    
    
// })();




</script>

<template>
    <div class="main">
        <div class="result2 shadow-lg shadow-black" style="display:inline-flexbox; overflow:scroll">
            <div class="header animate__animated animate__tada">
                <h2>High Scores</h2>
            </div>

            <div class="grid-container">
                <div class="grid-item username animate__animated animate__bounceInLeft">Username</div>
                <div class="grid-item score animate__animated animate__bounceInLeft">Score</div>
            </div>
            <div>
                <p v-for="(user) in users" key="user">{{user.username}}: {{user.score}}</p>
            </div>
        </div>

        <div class="result shadow-lg shadow-black">
            <h2 style="text-align:center">Your Stats </h2> 
            <h5 style="text-align:center">Username: {{userName}} &emsp; &emsp; &emsp; Score: {{userScore}}</h5>
            <br>
            <div class="header" style="display:inline-flex" >
                
                <div style="display:inline-block; width: 60%;">
                <h5 class="animate__animated animate__tada">Question</h5>
                    <ResultQuestions />
                </div>

                <div style="display:inline-block; width: 40%;">
                <h5 class="animate__animated animate__tada">Answers</h5>
                    <ResultAnswers />
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
    background: white;
}

.result2 {
    width: 20%;
    height: 80vh;
    padding: 10px;
    float: left;
    margin: 30px;
    background: white;
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
