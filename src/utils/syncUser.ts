import { API_BASE_URL } from "../config/api";
import { getAuthToken } from "./getAuthToken";

export async function syncUser(){
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/auth/sync`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    if(!response.ok){
        throw new Error("Failed to sync user");
    }

    const data = await response.json();
    return data.user;

}