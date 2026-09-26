import { View, Text, Pressable, Image } from "react-native";
import { MapPin, Bell } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocation } from "@/hooks/useLocation";
import { useEffect } from "react";

export default function TopBar() {
const { location, locationLoading, detectLocation } = useLocation();

useEffect(() => {
  detectLocation();
}, []);

  return (
    <SafeAreaView edges={["top"]} className="bg-background">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-8 h-8"
          resizeMode="contain"
        />
        <Pressable
          onPress={detectLocation}
          className="flex-row items-center gap-1 border border-gray-200 rounded-full bg-[#F4F3EF] px-5 py-2 min-w-[150px] justify-center"
        >
            <MapPin size={14}/>
            <Text numberOfLines={1}>
              {locationLoading ? "Detecting..." : (location?.name ?? "Set location")}
            </Text>
        </Pressable>
        <Bell size={22} color="#333" />
      </View>
    </SafeAreaView>
  );
}
