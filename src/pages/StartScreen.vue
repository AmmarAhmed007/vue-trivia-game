<script setup lang="ts">
import { ref } from "vue";
import { apiUsersRegister } from "../api/users"

const username = ref("");
const displayError = ref("");
const onSubmit = async () => {
  const [error, user] = await apiUsersRegister(username.value)
  if (error !== null) {
    displayError.value = error;
  } else {
    console.log("VERY NICE");

  }

  console.log("ERR", error);
  console.log("USER", user);
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <label for="username" aria-label="Username">Enter your username to start:</label>
      <br />
      <br />
      <input type="text" id="username" placeholder="GamerNerd123" v-model="username" />

      <button type="submit" style="padding-left: 10px;">Enter the trivia</button>
    </fieldset>
  </form>
  <p>Your entered name is: {{ username }}</p>

  <div v-if="displayError" class="bg-red-500 text-white p-3">
    <span class="text-lg block mb-3">Error</span>
    <p>{{ displayError }}</p>
  </div>
</template>
