import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-xl font-bold text-primary">Post</Text>
    </SafeAreaView>
  );
}