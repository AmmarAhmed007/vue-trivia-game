<script setup lang="ts">
import { reactive, ref } from "vue";
import { apiGetUser, apiUsersRegister, apiFindAll, UserResponse } from "../api/users"

const user = ref("");
const displayError = ref("");

const users = reactive<UserResponse[]>([]);


const onSubmit = async () => {

  // const user = await apiFindAll();

  const _user = await apiGetUser(user.value);

  console.log(user);

  const { username, score, id } = _user[0];

  console.log(_user[0]);

  console.log(username);
  console.log(score);
  console.log(id);


  // const name =  apiGetUser(username.value);

  // console.log(name);


  // const user = await apiUsersRegister(username.value);
  // const error = "";
  // if (error !== null) {
  //   displayError.value = error;
  // } else {
  //   console.log("VERY NICE");

  // }

  // console.log("ERR", error);
  // console.log("USER", user);
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <label for="username" aria-label="Username">Enter your username to start:</label>
      <br />
      <br />
      <input type="text" id="username" placeholder="GamerNerd123" v-model="user" />

      <button type="submit" style="padding-left: 10px;">Enter the trivia</button>
    </fieldset>
  </form>
  <p>Your entered name is: {{ user }}</p>

  <div v-if="displayError" class="bg-red-500 text-white p-3">
    <span class="text-lg block mb-3">Error</span>
    <p>{{ displayError }}</p>
  </div>
</template>
