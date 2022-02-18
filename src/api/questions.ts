import axios from "axios";
import { QUIZ_URL } from "./";

const TRIVIA_URL = "https://opentdb.com/api.php?amount=10&category=15"

const apiDiff = "&difficulty=";
const apiType = "&type=";

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

export async function fetchAllQuestions(diff: string, type: string): Promise<[string | null, Trivia[]]> {
    try {
        const _difficulty = apiDiff + diff;
        const _type = apiType + type;

        const URL = TRIVIA_URL + _difficulty + _type;
        console.log(URL);

        const { data } = await axios.get<TriviaResponse>(URL);
        return [null, data.results];
    } catch (error: any) {
        return [error.message, []];
    }
}

