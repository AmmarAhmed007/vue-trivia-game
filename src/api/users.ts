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

export async function apiGetUser(user: any): Promise<any> {
    try {
        const { data } = await axios.get<UserResponse>(`${BASE_URL}?username=${user}`)
        return data;
    } catch (error: any) {
        console.log(error);
    }
}

export async function apiUsersRegister(username: any) {
    try {
        const config = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username
                }
            })
        }

        const response = await fetch(`${BASE_URL}?username=${username}`, config)
        const { success, data, error = "An error occured" } = await response.json()
        if (!success) {
            throw new Error(error)
        }

        return [null, data]
    }
    catch (error: any) {
        return [error.message, null]

    }
}