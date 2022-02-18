import axios from "axios";

const TRIVIA_URL = "https://opentdb.com/api.php?category=15"
const apiAmount = "&amount="
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

export async function fetchTriviaQuestions(amount: string, diff: string, type: string): Promise<[string | null, Trivia[]]> {
    try {
        const _amount = apiAmount + amount;
        const _difficulty = apiDiff + diff;
        const _type = apiType + type;

        const URL = TRIVIA_URL + _amount + _difficulty + _type;
        console.log(URL);

        const { data } = await axios.get<TriviaResponse>(URL);
        return [null, data.results];
    } catch (error: any) {
        return [error.message, []];
    }
}