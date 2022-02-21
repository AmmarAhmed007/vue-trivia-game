<script setup lang="ts">
import store from '../store';
import { computed, reactive, ref } from "vue";


function listUserResult() {


    questions.value.forEach(element => {
        
    });
}

    const questions = computed(() => store.state.questions);
    const answers = computed(() => store.state.answers);

</script>

<template>
    <ul>
        <p v-for="question in questions" :key="question">
            {{question}}
        </p>
        <li v-for="answer in answers" :key="answer">
            {{answer}}
        </li>
    </ul>
</template>