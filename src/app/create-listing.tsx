import { X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, View , Text } from "react-native";

export default function CreateList (){

const router = useRouter();

return (
<SafeAreaView className="flex-1 bg-white">
<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
<Pressable
onPress={()=> router.back()}>
<X size={24} color="#333"/>
</Pressable>
    <Text className=" font-semibold">
        Create Listing
    </Text>
      <View style={{ width: 24 }} />
</View>
<View className="flex-1 items-center justify-center">
    <Text className="text-gray-400">Form fields will go here</Text>
</View>
</SafeAreaView>




)











}