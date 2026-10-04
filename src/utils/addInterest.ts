import { getAuthToken } from "./getAuthToken";
import { API_BASE_URL } from "@/config/api";


export async function addInterest(listingId:string){
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/auth/interests/${listingId}`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })

    if(!response.ok){
        const body = await response.text()
         console.log("addInterest failed:", response.status, body);
        throw new Error("Failed to save inteests")
    }
    const data = await response.json();
    return data.user;
}