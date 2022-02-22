<script setup lang="ts">
import { reactive, ref, VueElement } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import { apiGetUser, apiUsersRegister, apiFindAll, UserResponse } from "../api/users"
import { apiPostUser } from "../api/users";

const user = ref("");
const displayError = ref("");

// const users = reactive<UserResponse[]>([]);

const store = useStore();
const router = useRouter();

const onSubmit = async () => {
  // assign values of checked radio buttons
  const checkedAmount = document.querySelector('input[name="amount"]:checked') as any;
  const checkedCategory = document.querySelector('input[name="category"]:checked') as any;
  const checkedDifficulty = document.querySelector('input[name="diff"]:checked') as any;

  // commit username and checked trivia api parameters to vuex store variables 
  store.commit("setName", user.value);
  store.commit("setTriviaAmount", checkedAmount.value);
  store.commit("setTriviaCategory", checkedCategory.value);
  store.commit("setTriviaDifficulty", checkedDifficulty.value);

  apiPostUser(user.value);

  // change to Question.vue
  router.push("/question");
}

</script>

<template>
  <div style="display:flexbox">
    <h5>Select Amount</h5>
    <div class="triviaAmount">
      <div>
        <input type="radio" value="5" name="amount" />
        5
        <input type="radio" value="10" name="amount" checked />
        10
        <input type="radio" value="15" name="amount" />
        15
      </div>
    </div>
    <div class="triviaCategory">
      <h5>Select category</h5>
      <div>
        <input type="radio" value="29" name="category" />
        Comics
        <input type="radio" value="11" name="category" checked />
        Films
        <input type="radio" value="15" name="category" />
        Video Games
      </div>
    </div>
    <div class="triviadiff">
      <h5>Select difficulty</h5>
      <input type="radio" value="easy" name="diff" />
      Easy
      <input type="radio" value="medium" name="diff" checked />
      Medium
      <input type="radio" value="hard" name="diff" />
      Hard
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

  <div v-if="displayError" class="bg-red-500 text-white p-3">
    <span class="text-lg block mb-3">Error</span>
    <p>{{ displayError }}</p>
  </div>
</template>

<style>
/* .triviaAmount {
  padding: 10px;
  width: 20%;
} */

.btn {
  display: flow-root;
}
</style>
