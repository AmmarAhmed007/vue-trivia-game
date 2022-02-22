import { createStore } from "vuex";
import { apiGetUser } from "./api/users";

export default createStore({
    state: {
        // variables and collections
        user: {
            name: "",
            score: "",
            id: "",
        },
        triviaParams: {
            amount: "10",
            category: "15",
            difficulty: "medium",
        },
        questions: [],
        answers: [],
        results: [],
    },
    mutations: {
        // synchronous function for changing state 
        setName: (state, name) => {
            state.user.name = name;
        },
        setScore: (state, score) => {
            state.user.score = score;
        },
        setId: (state, id) => {
            state.user.id = id;
        },
        setUser: (state, user) => {
            state.user = user;
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

        // setUserName: ({commit, state}, newName) => {
        //     commit('setName',  newName);
        //     return state.userName;
        // },


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
            return state.user.name;
        },
    }
})