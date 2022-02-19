import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import StartScreen from "./pages/StartScreen.vue"
import Result from "./pages/Result.vue"
import Question from "./pages/Question.vue"


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Question
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
});