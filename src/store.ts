import { createStore } from "vuex";
import { apiGetUser, apiFetchUsers, UserResponse } from "./api/users";

export default createStore({
    state: {
        // variables and collections
        userName: "Gamer123",
        user: {
            name: "",
            score: "",
        },
        triviaParams: {
            amount: "10",
            category: "15",
            difficulty: "medium",
        },
        questions: [],
        answers: [],
        results: [],
        users: [],
    },
    mutations: {
        // synchronous function for changing state 
        setName: (state, name) => {
            state.userName = name;
        },
        setScore: (state, score) => {
            state.user.score = score;
        },
        setUsers: (state, users) => {
            state.users = users;
        },
        setTriviaAmount: (state, amount) => {
            state.triviaParams.amount = amount;
        },
        setTriviaCategory: (state, category) => {
            state.triviaParams.category = category;
        },
        setTriviaDifficulty: (state, difficulty) => {
            state.triviaParams.difficulty = difficulty;
        },
        setTriviaQuestions: (state, questions) => {
            state.questions = questions;
        },
        setTriviaAnswers: (state, answers) => {
            state.answers = answers;
        },
        setUserAnswers: (state, answers) => {
            state.results = answers;
        },
    },
    actions: {
        // asynchronous functions that can call one or more mutation functions

        setUserName: ({ commit, state }, newName) => {
            commit('setName', newName);
            return state.userName;
        },
        async fetchUsers({ commit }) {
            // const response = await fetch("https://aa-jc-vue-trivia-game.herokuapp.com/trivia")
            // const users = await response.json()

            const users = await apiFetchUsers();

            // this.state.users.push(...users)
            commit('setUsers', users)
        },


        // async registerTriviaUser({ commit, state }, action) {
        //     try {
        //         if (action !== "login" && action !== "register") {
        //             throw new Error("registerTriviaUser: Something went wrong!" + action)
        //         }

        //         const [ error, user ] = await apiGetUser(
        //             action,
        //             username.value
        //         )
        //     } catch (error: any) {
        //         console.log(error.message);

        //     }
        // }
    },
    getters: {
        userName: (state) => {
            return state.userName;
        },
        getUsers: (state) => { return state.users },
    }
})