import { View, Text, Pressable } from "react-native";
import { Bell, ChevronDown, Zap } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocation } from "@/hooks/useLocation";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useNotifications } from "@/hooks/useNotifications";
import { usePathname } from "expo-router";

export default function TopBar() {
  const { location, locationLoading, detectLocation } = useLocation();
  const { unreadCount, refetch } = useNotifications();
  const pathname = usePathname();

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener(() => {
      refetch();
    });
    return () => sub.remove();
  }, [refetch]);
  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <SafeAreaView edges={["top"]} className="bg-background ">
      <View className="flex-row items-center gap-2 px-4 py-2.5">
        <Pressable
          onPress={detectLocation}
          className="shrink items-start rounded-2xl px-2 py-1.5 active:bg-gray-200/60"
        >
          <View className="flex-row items-center gap-1">
            <Zap color="#A33900" fill="#A33900" size={11} />
            <Text className="text-[10px] font-semibold tracking-widest text-gray-500">
              BROWSING NEAR
            </Text>
          </View>
          <View className="flex-row items-center gap-0.5 mt-0.5 max-w-full">
            <Text
              numberOfLines={1}
              className="text-[15px] font-bold text-gray-900 shrink"
            >
              {locationLoading
                ? "Detecting..."
                : (location?.name ?? "Set location")}
            </Text>
            <ChevronDown size={16} color="#111827" strokeWidth={2.5} />
          </View>
        </Pressable>

        <View className="ml-auto">
          <Pressable
            className="w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-100 active:bg-gray-100"
            style={{ boxShadow: "0px 1px 3px rgba(0,0,0,0.08)" }}
          >
            <Bell size={20} color="#333" />
            {unreadCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-[#A33900] rounded-full min-w-[18px] items-center justify-center px-1">
                <Text className="text-white text-[10px] font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
