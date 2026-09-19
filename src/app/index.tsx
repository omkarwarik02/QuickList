import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen () {
 return(
 <SafeAreaView className="flex-1 bg-white justify-between px-6 pb-10">
  <View className="flex-1 justify-center items-center">
  <Image source={require('../../assets/images/HomeLogo.png')}
    className="w-32 h-32"
  resizeMode="contain"
  
  />
  <Text className="text-4xl font-bold text-primary mt-4">QuickList</Text>
  </View>
 </SafeAreaView>





 )
}
