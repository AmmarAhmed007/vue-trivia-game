import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import StartScreen from "./pages/StartScreen.vue"
import Result from "./pages/Result.vue"
import Question from "./pages/Question.vue"


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: StartScreen
    },
    {
        path: "/question",
        component: Question
    },
    {
        path: "/result",
        component: Result
    }
]

export default createRouter({  
    history: createWebHistory(),
    routes
});