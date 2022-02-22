<script setup lang="ts">
import store from '../store';
import { computed, onMounted } from "vue";
import { apiFetchUsers, UserResponse } from "../api/users";

// const answers = computed(() => store.state.answers);


// const users: UserResponse[] = [];


onMounted(() => {
    store.dispatch("fetchUsers")
})

const usersApi = computed(() => store.state.users);

// const users =  computed(() => store.getters.getUsers);

// console.log(users.value.length);

console.log(usersApi.value);



// const users: UserResponse[] = [];

// (async function () {
//     const apiUsers = await apiFetchUsers();

//     console.log(apiUsers);

//     users.push(...apiUsers);

// })();


</script>

<template>
    <div v-for="(user) in usersApi" key="user">
        <p>{{ user }} {{ user.score }}</p>
    </div>
    <!-- <div v-for="(user) in users" key="user">

        <p>{{user.username}} {{user.score}}</p>
    </div>-->
</template>

<style>
p {
    border: 1px solid;
    height: 15vh;
    padding: 10px;
}
</style>