<script setup lang="ts">
    import 'animate.css'
    import { computed, reactive, ref } from "vue";
    import { useStore } from "vuex";

    const store = useStore();

    const questions = computed(() => store.state.questions);
    const questionAnswers = computed(() => store.state.answers);
    const userAnswers = computed(() => store.state.results);

    console.log(questions.value);
    console.log(questionAnswers.value);
    console.log(userAnswers.value);

</script>

<template>
    <div class="result shadow-lg shadow-black">
        <div class="header animate__animated animate__tada">
            <h2>High Score</h2>
        </div>
        <div class="grid-container">
            <div class="username animate__animated animate__bounceInLeft">Username</div>
            <div class="score animate__animated animate__bounceInLeft">Score</div>
            <p>{{questions}}</p> <br>
            <p>{{questionAnswers}}</p> <br>
            <p>{{userAnswers}}</p>
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
</template>

<style>
.grid-container {
    display: grid;
    text-align: center;
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
}

.header {
    text-align: center;
}

table {
    padding: 15px;
    border: 1px solid;
    text-align: center;
    align-content: center;
}

.btn1 {
    grid-column: 1;
}

.btn2 {
    grid-column: 2;
}
</style>
