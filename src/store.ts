import { createStore } from "vuex";
import { apiGetUser } from "./api/users";

export default createStore({
    state: {
        user: null
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user;
        }
    },
    actions: {
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
    }
})