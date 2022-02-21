<script setup lang="ts">
import { reactive, ref, VueElement } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { apiGetUser, apiUsersRegister, apiFindAll, UserResponse } from "../api/users"

const user = ref("");
const displayError = ref("");

const users = reactive<UserResponse[]>([]);


const store = useStore();
const router = useRouter();



const onSubmit = async () => {

  store.commit("setName", user.value);

  router.push("/question");

  // const user = computed(() => store.state.user.userName);

  // store.dispatch('setUserName', "JC")


  // const user = await apiFindAll();

  // const _user = await apiGetUser(user.value);

  // console.log(user);

  // const { username, score, id } = _user[0];

  // console.log(_user[0]);

  // console.log(username);
  // console.log(score);
  // console.log(id);


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
  <div style="display:flexbox">
    <div class="triviaAmount">
      <h5>Select Trivia Amount</h5>
      <div>
        5
        <input type="radio" value="5" name="amount" />
        10
        <input type="radio" value="10" name="amount" />
        15
        <input type="radio" value="15" name="amount" />
      </div>
    </div>

    <div class="triviadiff">
      <h5>Select difficulty</h5>Easy
      <input type="radio" name="diff" />
      Medium
      <input type="radio" name="diff" />
      Hard
      <input type="radio" name="diff" />
    </div>

    <div class="triviaType">
      <h5>Select question type</h5>True/False
      <input type="radio" name="type" />
      Multiple Choise
      <input type="radio" name="type" />
    </div>
  </div>

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

<style>
.triviaAmount {
  padding: 10px;
  width: 20%;
}

.btn {
  display: flow-root;
}
</style>
