import { router, Tabs } from "expo-router";
import TopBar from "@/components/TopBar";
import { View } from "react-native";
import { LayoutGrid, ClipboardList, Plus, Heart, User } from "lucide-react-native";
export default function AppTabsLayout() {
  return (
    <View style={{ flex: 1 }}>
       <TopBar />
    <Tabs screenOptions={{ headerShown: false,tabBarActiveTintColor: "#A33900",  tabBarInactiveTintColor: "#9CA3AF",
      sceneStyle: { backgroundColor: "#FFF9F5" },
      // White tab bar with a thin light-gray line and rounded top corners
      tabBarStyle: {
        // Side borders are needed so the line follows the rounded top corners
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#E5E7EB",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: "#FFFFFF",
        elevation: 0,
        shadowOpacity: 0,
      },
    }}

    >
      <Tabs.Screen 
      name="home"
      options={{
          title: "Home",
        tabBarIcon:({color, size}) => <LayoutGrid color={color} size={size} />
      }}
      />
      <Tabs.Screen 
      name="listings"
       options={{
          title: "Listings",
          tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />,
        }}
      
      />
      <Tabs.Screen 
      name="post"
      options={{
         tabBarLabel: () => null,
         tabBarIcon:() => (
          <View
           className="bg-[#A33900] rounded-full items-center justify-center"
           style={{
            width:56,
            height:56,
            marginBottom:28,
            shadowColor:"#000",
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
        listeners={() =>({
          tabPress:(e) =>{
            e.preventDefault();
            router.push("/create-listing");
          }
        })}
      />

      <Tabs.Screen 
      name="interests"
      options={{
          title: "Interests",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen 
      name="profile"
      options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
    </View>
  );
}