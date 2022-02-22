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

  const apiUser = { username: user.value, score: "10", id: "0" };

  apiPostUser(user.value);

  // change to Question.vue
  router.push("/question");
}

</script>

<template>
  <div class="mainDiv">
    <h5>Select amount</h5>
    <div class="triviaAmount">
      <div>
        <input type="radio" value="5" name="amount" class="form-check-input" />
        5
        <input type="radio" value="10" name="amount" checked class="form-check-input" />
        10
        <input type="radio" value="15" name="amount" class="form-check-input" />
        15
      </div>
    </div>
    <div class="triviaCategory">
      <h5 style="margin-top:15px">Select category</h5>
      <div>
        <input type="radio" value="29" name="category" class="form-check-input" />
        Comics
        <input
          type="radio"
          value="11"
          name="category"
          checked
          class="form-check-input"
        />
        Films
        <input type="radio" value="15" name="category" class="form-check-input" />
        Video Games
      </div>
    </div>
    <div class="triviadiff">
      <h5 style="margin-top:15px">Select difficulty</h5>
      <input type="radio" value="easy" name="diff" class="form-check-input" />
      Easy
      <input type="radio" value="medium" name="diff" checked class="form-check-input" />
      Medium
      <input type="radio" value="hard" name="diff" class="form-check-input" />
      Hard
    </div>
  </div>

  <form @submit.prevent="onSubmit">
    <fieldset>
      <!-- <label for="username" aria-label="Username">Enter your username to start:</label> -->
      <br />
      <br />
      <div style="text-align:center;">
        <div>
          <input type="text" id="username" placeholder="Enter your username to start" v-model="user" autofocus/>
        </div>
        <div style="margin-top: 20px;">
          <button type="submit" style="padding-left: 10px;" class="button">
            <span>Enter the trivia</span>
          </button>
        </div>
      </div>
    </fieldset>
  </form>

  <div v-if="displayError" class="bg-red-500 text-white p-3">
    <span class="text-lg block mb-3">Error</span>
    <p>{{ displayError }}</p>
  </div>
</template>

<style>
.mainDiv {
  display: flexbox;
  border: 1px solid;
  height: 40vh;
  width: 60vh;
  text-align: center;
  padding-top: 20px;
  background-color: white;
  border-radius: 5px;
}

.btn {
  display: flow-root;
}

.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 22px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}

body {
  background-image: url('../assets/education-g4fb8e8f7f_1920.jpg');
  background-size: cover;
}

input {
  width: 50vh;
}

</style>
