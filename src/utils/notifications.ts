import { getAuthToken } from "./getAuthToken";
import { API_BASE_URL } from "@/config/api";


export async function getNotifications(){
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/notifications`,{
        headers:{Authorization:`Bearer ${token}`},
    });

   if (!response.ok) {
  const text = await response.text();
  console.log("NOTIF ERROR:", response.status, text);
  throw new Error(`Failed to fetch notifications (${response.status})`);
}
    return response.json()
}

export async function markAllNotificationsRead(){
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/notifications/read-all`,{
        method:"PATCH",
        headers:{Authorization:`Bearer ${token}`},
    });

    if(!response.ok){
        throw new Error("Failed to mark notifications as read");
    }
}