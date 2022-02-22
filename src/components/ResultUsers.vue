<script setup lang="ts">
import store from '../store';
import { computed } from "vue";
import { apiFetchUsers, UserResponse } from "../api/users";

// const answers = computed(() => store.state.answers);

// const results = computed(() => store.state.results);

const users: UserResponse[] = [];

(async function () {
    const apiUsers = await apiFetchUsers();

    console.log(apiUsers);

    users.push(...apiUsers);

})();


</script>

<template>
    <div v-for="(user) in users" key="user">
        <p>{{user.username}} {{user.score}}</p>
    </div>
</template>

<style>
p {
    border: 1px solid;
    height: 15vh;
    padding: 10px;
}
</style>