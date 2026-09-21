import { Text, View, StyleSheet, Image,Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowRight } from 'lucide-react-native';
import { useOnboarding } from "../hooks/useOnboarding";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
 import { ActivityIndicator } from "react-native";



export default function LandingScreen () {
    const { step, slides, current, isLastSlide, handleNext, user } = useOnboarding();
    const { loading} = useAuth();
    const router = useRouter();



    useEffect(()=>{
      if(!loading && user){
        router.replace("/(seller)/listings");
      }
    },[loading,user]);

   

if (loading || user) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#A33900" />
    </View>
  );
}




 return(
 <SafeAreaView className="flex-1 bg-white px-6 justify-between pb-10">
  {/* Top: image + title + subtitle for current slide */}
  <View className="flex-1 items-center justify-center">
  <Image source={current.image} className="w-40 h-40" resizeMode="contain" />
  <Text className="text-3xl font-bold text-primary mt-6 text-center">{current.title}</Text>
  <Text className="text-base text-gray-500">{current.subtitle}</Text>
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
 {/* Next / Get Started button */}
<Pressable className="h-[52px] bg-[#CC4900] rounded-full items-center flex-row justify-center gap-2"
onPress={handleNext}
>
  <Text className="text-white text-base font-semibold">
    {isLastSlide ? (user ?"Continue" : "Get Started") :"Next"}
  </Text>
 <ArrowRight color="white" size={18} />
</Pressable>

{isLastSlide && !user &&(
       <Pressable className="mt-4 items-center">
          <Text className="text-sm text-gray-600">
            Already have an account?{" "}
            <Text className="text-[#A33900] font-semibold">Sign In</Text>
          </Text>
        </Pressable>
)}


 </SafeAreaView>




 )
}
