import { Text, View, StyleSheet, Image,Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowRight } from 'lucide-react-native';
import { useOnboarding } from "../hooks/useOnboarding";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
 import { ActivityIndicator } from "react-native";
import { registerPushToken } from "@/utils/registerPushToken";


export default function LandingScreen () {
    const { step, slides, current, isLastSlide, handleNext, user } = useOnboarding();
    const { loading} = useAuth();
    const router = useRouter();



    useEffect(()=>{
      if(!loading && user){
        router.replace("/(app)/home");
      }
    },[loading,user]);

   

if (loading || user) {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color="#A33900" />
    </View>
  );
}




 return(
 <SafeAreaView className="flex-1 bg-background px-6 justify-between pb-10">
  {/* Top: image + title + subtitle for current slide */}
  <View className="flex-1 items-center justify-center">
  {"cropToTile" in current && current.cropToTile ? (
    // The orange tile fills ~90% of icon.png, so oversize the image and clip to the tile's rounded shape
    <View style={{ width: 160, height: 160, borderRadius: 34, overflow: "hidden" }}>
      <Image source={current.image} style={{ width: 178, height: 178, margin: -9 }} resizeMode="contain" />
    </View>
  ) : (
    <Image source={current.image} className="w-40 h-40" resizeMode="contain" />
  )}
  <Text className="text-3xl font-bold text-primary mt-6 text-center">{current.title}</Text>
  <Text className="text-base text-gray-500 text-center leading-6 mt-3 px-4 max-w-[320px]">{current.subtitle}</Text>
  </View>

{/* Dot indicators */}
<View className="flex-row justify-center gap-2 mb-6">
  {slides.map((_, index)=>(
    <View 
    key={index}
    className={`h-2 rounded-full ${
      index === step ? "w-6 bg-[#A33900]" :  "w-2 bg-gray-300"
    
    }`}
    >

    </View>
  ))}

</View>

<Pressable className="h-[52px] bg-[#CC4900] rounded-full items-center flex-row justify-center gap-2"
onPress={handleNext}
>
  <Text className="text-white text-base font-semibold">
    {isLastSlide ? (user ?"Continue" : "Get Started") :"Next"}
  </Text>
 <ArrowRight color="white" size={18} />
</Pressable>



 </SafeAreaView>




 )
}
