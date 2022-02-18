import axios from "axios";
import { QUIZ_URL } from "./";

const TRIVIA_URL = "https://opentdb.com/api.php?amount=10&category=15"

const apiDiff = "&difficulty=";
const apiType = "&type=";

let difficulty = "";
let type = "";


export interface TriviaResponse {
    response_code: number,
    results: Trivia[]
}

export interface Trivia {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}


export async function fetchAllQuestions(): Promise<[string | null, Trivia[]]> {
    try {
        const { data } = await axios.get<TriviaResponse>(TRIVIA_URL);
		return [null, data.results];
    } catch (error: any) {
        return [error.message, []];
    }
}





export function selectDifficulty( d: string ) {
    difficulty = apiDiff + d;
    console.log("API DIFFICULTY: " + difficulty);
}

export function selectType( t: string ) {
    type = apiType + t;
    console.log("API Type: " + type);
}

