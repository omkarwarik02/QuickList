import { View, Text, Pressable } from "react-native";
import { Bell, ChevronDown, Zap } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocation } from "@/hooks/useLocation";
import { useEffect } from "react";

export default function TopBar() {
const { location, locationLoading, detectLocation } = useLocation();

useEffect(() => {
  detectLocation();
}, []);

  return (
    <SafeAreaView edges={["top"]} className="bg-background ">
      <View className="flex-row items-center gap-2 px-4 py-2.5">
        
        <Pressable
          onPress={detectLocation}
          className="items-center max-w-[40%] rounded-2xl px-2 py-1.5 active:bg-gray-200/60"
        >
          <View className="flex-row items-center gap-1">
            <Zap color="#A33900" fill="#A33900" size={11} />
            <Text className="text-[10px] font-semibold tracking-widest text-gray-500">
              BROWSING NEAR
            </Text>
          </View>
          <View className="flex-row items-center gap-0.5 mt-0.5 max-w-full">
            <Text numberOfLines={1} className="text-[15px] font-bold text-gray-900 shrink">
              {locationLoading ? "Detecting..." : (location?.name ?? "Set location")}
            </Text>
            <ChevronDown size={16} color="#111827" strokeWidth={2.5} />
          </View>
        </Pressable>

        <View className="flex-1 items-end">
          <Pressable
            className="w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-100 active:bg-gray-100"
            style={{ boxShadow: "0px 1px 3px rgba(0,0,0,0.08)" }}
          >
            <Bell size={20} color="#333" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border border-white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
