import { API_BASE_URL } from "../config/api";
import { getAuthToken } from "../utils/getAuthToken";



export async function getInterestedListings(){
    const token =  await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/auth/interests`,{
        headers:{
            Authorization:`Bearer ${token}`
        }  
    });
    if(!response.ok){
        throw new Error("Failed to load interested listings")
    }
    const data = await response.json()
    return data.listings

}