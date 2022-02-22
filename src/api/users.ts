import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./";

export interface UserResponse {
    username: string;
    score: number;
    id: number;
}

export async function apiFetchUsers(): Promise<UserResponse[]> {
    const users: UserResponse[] = [];
    try {
        const { data } = await axios.get<UserResponse[]>(BASE_URL);
        users.push(...data);
    } catch (error: any) {
        console.log(error.message);
    }
    return users;
}

export async function apiGetUser(user: string): Promise<any> {
    const apiKey = "q0oAROehq0u7HUS7yve0AQ==";

    try {
        const { data } = await axios.get<UserResponse>(`${BASE_URL}?username=${user}`, { headers: { 'x-api-key': apiKey } })
        return data;
    } catch (error: any) {
        console.log(error);
    }
}

export async function apiPostUser(name: string): Promise<any> {

    const apiUser = { username: name, score: 0};

    const apiKey = "q0oAROehq0u7HUS7yve0AQ==";

    return axios.post(`${BASE_URL}`, apiUser, { headers: { 'x-api-key': apiKey } })

        .catch(error => {
            console.error("There was an error!", error.message);
            alert(error.message);
        });
}

export async function apiPutUserHighScore(name: string, score: number, id: number): Promise<any> {

    const updatedUser = { name: name, score: score, id: id}

    console.log(updatedUser);
    

    const apiKey = "q0oAROehq0u7HUS7yve0AQ==";

    return axios.put(`${BASE_URL}?id=${updatedUser.id}`, updatedUser, { headers: { 'x-api-key': apiKey } })
        .catch(error => {
            console.error("There was an error!", error.message);
            alert(error.message);
        });
}