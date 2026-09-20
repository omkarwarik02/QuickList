import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";




const features = [
  { icon: "⚡", bg: "#FFDBCE", title: "Instant", subtitle: "Matching" },
  { icon: "📍", bg: "#86F2E4", title: "< 5 Miles", subtitle: "Hyperlocal" },
  { icon: "🛡️", bg: "#FFDBCE", title: "Protected", subtitle: "Safe Deals" },
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
  <View className="flex-row mt-auto items-center gap-3 h-[112px] w-[358px] border border-gray-200 rounded-2xl px-4">
      <Image source={require('../../assets/images/Hand.png')}
    className="w-10 h-10"
  resizeMode="contain"
  
  />
  
     
  <View className="flex-1 flex-col gap-1">
    <View className="bg-[#86F2E4] rounded-xl px-2 py-1  w-[90px]">
      <Text className="text-[#006F66]  text-xs">0% Seller Fees</Text>
    </View>
    
      <Text className="font-normal">Direct local commerce without the middleman.Connect with verified neighbors in seconds. </Text>
  </View>

  </View>
  <View className="flex flex-row justify-between gap-3 mt-4">
  {features.map((feature,index)=>(
    <View key={index} className="flex-1 items-center bg-gray-100 rounded-xl py-3">
      <View
      className="rounded-full w-10 h-10 items-center justify-center mb-2"
      style={{backgroundColor:feature.bg}}
      >
        <Text>{feature.icon}</Text>
      </View>
      <Text className="font-semibold text-sm text-center">{feature.title}</Text>
      <Text className="text-xs text-gray-500 text-center">{feature.subtitle}</Text>

      </View>
  ))}
  </View>
 </SafeAreaView>





 )
}
