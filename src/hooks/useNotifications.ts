import { useState, useCallback } from "react";
import { getNotifications } from "@/utils/notifications";


export type AppNotification = {
  _id: string;
  title: string;
  body: string;
  listing?: string;
  read: boolean;
  createdAt: string;
};

export function useNotifications(){
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

const refetch = useCallback(async()=>{
    try{
        const data = await getNotifications();
        console.log("NOTIFS:", data.unreadCount, data.notifications?.length);
        setNotifications(data.notifications ?? []);
        setUnreadCount(data.unreadCount); 
    } catch(err){
        console.error("Failed to load notificcations:", err);
    } finally {
        setLoading(false);
    }
},[])




return {notifications,loading,refetch,unreadCount};















}