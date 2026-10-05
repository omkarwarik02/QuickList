import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { getAuthToken } from "./getAuthToken";
import { API_BASE_URL } from "@/config/api";


export async function registerPushToken(){


    if(!Device.isDevice) return;

    if(Platform.OS === "android"){
        await Notifications.setNotificationChannelAsync("default",{
            name:"default",
            importance:Notifications.AndroidImportance.MAX,
        })
    }

    const { status:existing} = await Notifications.getPermissionsAsync();

    let finalStatus = existing;

    if(existing !== "granted"){
        const { status} = await Notifications.requestPermissionsAsync();
        finalStatus = status
    }

    if(finalStatus !== "granted") return;

    const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;


    const { data: pushToken} = await Notifications.getExpoPushTokenAsync({ projectId});


    const token = await getAuthToken();
    const response = await fetch(`${API_BASE_URL}/auth/push-token`,{
        method:"PATCH",
        headers:{Authorization:`Bearer ${token}`, "Content-Type": "application/json" },
        body:JSON.stringify({ pushToken}),
    });

    if(!response.ok) throw new Error("Failed to save push token");

}