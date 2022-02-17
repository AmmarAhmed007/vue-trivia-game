import { BASE_URL } from "./";

export async function apiUsersRegister(username:any) {
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

        const response = await fetch(`${BASE_URL}/users/register`, config)
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