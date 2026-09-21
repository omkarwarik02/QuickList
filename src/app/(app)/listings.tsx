import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyListingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
      <Text className="text-2xl font-bold text-primary">My Listings</Text>
      <Text className="text-gray-500 text-center mt-2">
        Your listings will show up here.
      </Text>
    </SafeAreaView>
  );
}