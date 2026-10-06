import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, BellOff } from "lucide-react-native";
import { useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { markAllNotificationsRead } from "@/utils/notifications";


function timeAgo(date: string) {
  const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsScreen(){
    const router = useRouter();
    const { notifications, unreadCount, loading, refetch} = useNotifications();


    useEffect(()=>{
        refetch();
    },[refetch])


    useEffect(()=>{
        if(loading || unreadCount === 0) return;
        markAllNotificationsRead().catch((err)=>
        console.error("Mark read failed:", err)
        );
    },[loading, unreadCount]);



        return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center gap-3 px-4 pt-2 pb-1">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-100"
        >
          <ArrowLeft size={20} color="#333" />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900">Notifications</Text>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" color="#A33900" />
      ) : notifications.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-2">
          <BellOff size={40} color="#9CA3AF" />
          <Text className="text-gray-500">No notifications yet</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <Pressable
              disabled={!item.listing}
              onPress={() =>
                router.push({
                  pathname: "/listing/[id]",
                  params: { id: String(item.listing) },
                })
              }
              className={`rounded-2xl p-4 border active:opacity-80 ${
                item.read
                  ? "bg-white border-gray-100"
                  : "bg-[#FBF1EA] border-[#A33900]/30"
              }`}
            >
              <View className="flex-row items-start justify-between gap-2">
                <Text className="flex-1 font-semibold text-gray-900">
                  {item.title}
                </Text>
                {!item.read && (
                  <View className="w-2 h-2 rounded-full bg-[#A33900] mt-1.5" />
                )}
              </View>
              <Text className="text-gray-600 mt-1">{item.body}</Text>
              <Text className="text-xs text-gray-400 mt-2">
                {timeAgo(item.createdAt)}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
















































}