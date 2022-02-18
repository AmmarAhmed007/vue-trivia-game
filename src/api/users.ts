import { BASE_URL } from "./";

export async function apiGetUser(username: any) {
    fetch(`${BASE_URL}?username=${username}`)
        .then(response => response.json())
        .then(results => {
            // results will be an array of users that match the username of mega-mind.
            console.log(results);

        })
        .catch(error => {
            console.log(error);

        })
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