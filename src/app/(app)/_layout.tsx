import { Tabs } from "expo-router";
import { View } from "react-native";
import { LayoutGrid, ClipboardList, Plus, Heart, User } from "lucide-react-native";

export default function AppTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false,tabBarActiveTintColor: "#A33900",  tabBarInactiveTintColor: "#9CA3AF"}}
    
    >
      <Tabs.Screen 
      name="home"
      options={{
        tabBarIcon:({color, size}) => <LayoutGrid color={color} size={size} />
      }}
      />
      <Tabs.Screen 
      name="listings"
       options={{
          tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      
      />
      <Tabs.Screen 
      name="post"
      options={{
         tabBarIcon:() => (
          <View
           className="bg-[#cc4900] rounded-full items-center justify-center"
           style={{
            width:56,
            height:56,
            marginBottom:28,
            shadowColor:"000",
            shadowOffset:{width:0, height:4 },
            shadowOpacity:0.25,
            shadowRadius:6,
            elevation:6
           }}
          >
            <Plus size={26} color="white" />
          </View>
         )
        }}
      />

      <Tabs.Screen 
      name="interests"
      options={{
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen 
      name="profile"
      options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}