<script setup lang="ts">
//CompositionAPI
import StartScreen from "./pages/StartScreen.vue";
import Question from "./pages/Question.vue";
import Result from "./pages/Result.vue";
</script>

<template>
  <header>
    <!-- <StartScreen />  -->
    <Result />
    
  </header>
  <router-view />
  <Question />
</template>