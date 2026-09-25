import { API_BASE_URL } from "@/config/api";
import { getAuthToken } from "./getAuthToken";

export async function uploadPhoto(uri:string):Promise<string>{
    const token = await getAuthToken();

    const formData = new FormData();
    formData.append("image",{
        uri,
        name:"photo.jpg",
        type:"image/jpeg",
    } as any);


    const response = await fetch(`${API_BASE_URL}/upload`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
        },
        body: formData,
    });
    if(!response.ok){
        throw new Error("Photo upload failed");
    }

    const data = await response.json();
    return data.url;
}