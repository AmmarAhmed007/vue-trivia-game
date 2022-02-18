import { BASE_URL } from "./";

export async function apiGetUser(username:any) {
    try {
        const config = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
            })
        }

        const response = await fetch(`${BASE_URL}?username=${username}`, config)

        //return response;

        const { data } = await response.json();

        console.log(data);
        

        /*

        const { success, data, error = "An error occured" } = await response.json()
        if (!success) {
            throw new Error(error)
        }

        return [null, data]

        */

        return data;

        

    } 
    catch (error:any) {
        console.log(error.message);
        
    }
}

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