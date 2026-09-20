import { Text, View, StyleSheet, Image,Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowRight } from 'lucide-react-native';



const features = [
  { icon: require('../../assets/images/Flash.png'), bg: "#FFDBCE", title: "Instant", subtitle: "Matching" },
  { icon: require('../../assets/images/Location.png'), bg: "#86F2E4", title: "< 5 Miles", subtitle: "Hyperlocal" },
  { icon: require('../../assets/images/Secure.png'), bg: "#FFDBCE", title: "Protected", subtitle: "Safe Deals" },
];

export default function LandingScreen () {
 return(
 <SafeAreaView className="flex-1 bg-[#FFFFFF]  px-6 pb-10">
  <View className="items-center mt-20">
  <Image source={require('../../assets/images/HomeLogo.png')}
    className="w-32 h-32"
  resizeMode="contain"
  
  />
  <Text className="text-4xl font-bold text-primary mt-4">QuickList</Text>
  <Text className="text-1xl font-semibold mt-2 text-[#5A4138]">List it. Find it. Nearby.</Text>
  </View>
 <View className="flex-row mt-10 items-center gap-3 h-[112px] border border-gray-200 rounded-2xl px-4 bg-white">
  <View className="bg-[#FFDBCE] rounded-full w-14 h-14 items-center justify-center">
    <Image
      source={require('../../assets/images/Hand.png')}
      className="w-8 h-8"
      resizeMode="contain"
    />
  </View>

  <View className="flex-1 flex-col gap-2">
    <View className="bg-[#86F2E4] rounded-xl px-2 py-1 w-[110px] items-center">
      <Text className="text-[#006F66] text-xs font-medium">0% Seller Fees</Text>
    </View>

    <Text className="text-sm text-gray-500 leading-4">
      Direct local commerce without the middleman. Connect with verified neighbors in seconds.
    </Text>
  </View>
</View>
  <View className="flex flex-row justify-between gap-3 mt-10">
  {features.map((feature,index)=>(
    <View key={index} className="flex-1 items-center bg-gray-100 rounded-xl py-3">
      <View
      className="rounded-full w-14 h-14 items-center justify-center mb-2"
      style={{backgroundColor:feature.bg}}
      >
         <Image
              source={feature.icon}
              className="w-8 h-8"
              resizeMode="contain"
            />
      </View>
      <Text className="font-semibold text-sm text-center">{feature.title}</Text>
      <Text className="text-xs text-gray-500 text-center">{feature.subtitle}</Text>

      </View>
  ))}
  </View>
  <View className="mt-20">
  <Pressable className="h-[52px] bg-[#CC4900] rounded-full py-4 items-center flex-row justify-center gap-2">
    <Text className="text-white text-base font-semibold">Get Started</Text>
    <ArrowRight color="white" size={18} />
  </Pressable>
  </View>
  <View className="mt-6 justify-center  flex-row">
    <Text className="tex-sm text-gray-600">
      Already have an account?{" "}
    </Text>
    <Pressable>
      <Text className="text-[#A33900] font-semibold">
        Sign In
      </Text>
    </Pressable>
  </View>
 </SafeAreaView>





 )
}
