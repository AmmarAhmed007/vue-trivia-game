import axios from "axios";

const TRIVIA_URL = "https://opentdb.com/api.php?category=15"
const apiAmount = "&amount="
const apiCategory = "&category=";
const apiDiff = "&difficulty=";

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

export async function fetchTriviaQuestions(amount: string, category: string, diff: string): Promise<[string | null, Trivia[]]> {
    try {
        const _amount = apiAmount + amount;
        const _category = apiCategory + category;
        const _difficulty = apiDiff + diff;

        const URL = TRIVIA_URL + _amount + _category + _difficulty;
        console.log(URL);

        const { data } = await axios.get<TriviaResponse>(URL);
        return [null, data.results];
    } catch (error: any) {
        return [error.message, []];
    }
}