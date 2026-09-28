import { API_BASE_URL } from "../config/api";
import { getAuthToken } from "./getAuthToken";


export async function checkUser(){
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/auth/me`,{
        headers:{Authorization:`Bearer ${token}`},
    });


    if(response.status === 404){
        return null;
    }
    if(!response.ok){
        throw new Error("Failed to check user");
    }

    const data = await response.json()
    return data.user;
}