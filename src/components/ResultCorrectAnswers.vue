<script setup lang="ts">
import store from '../store';
import { computed } from "vue";

const answers = computed(() => store.state.answers);

</script>

<template>
    <div v-for="answer in answers" key="answer">
        <p>{{answer}}</p>

    </div>
</template>

<style>

p {

    border: 1px solid;
    padding: 10px;
}
</style>