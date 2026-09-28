import { router, Tabs } from "expo-router";
import TopBar from "@/components/TopBar";
import { Text, View } from "react-native";
import { House, ClipboardList, Plus, Heart, User } from "lucide-react-native";
import { Path } from "react-native-svg";

// Same rendered stroke thickness for every tab icon, regardless of icon size
const STROKE_WIDTH = 2;
const iconProps = { strokeWidth: STROKE_WIDTH, absoluteStrokeWidth: true };
// Stroke width in the icon's 24-unit viewBox, for detail paths drawn on top of a filled icon
const viewBoxStroke = (size: number) => (STROKE_WIDTH * 24) / size;

export default function AppTabsLayout() {
  return (
    <View style={{ flex: 1 }}>
       <TopBar />
    <Tabs screenOptions={{ headerShown: false,tabBarActiveTintColor: "#A33900",  tabBarInactiveTintColor: "#9CA3AF",
      sceneStyle: { backgroundColor: "#F7F7F8" },
      // Label only under the active tab, in the active color
      tabBarLabel: ({ focused, color, children }) =>
        focused ? <Text style={{ color, fontSize: 11, fontWeight: "600" }}>{children}</Text> : null,
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
        tabBarIcon: ({ color, size, focused }) => (
          <House color={color} size={size} fill={focused ? color : "none"} {...iconProps}>
            {/* Keep the door visible when the house is filled */}
            {focused && (
              <Path
                d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
                fill="white"
                stroke={color}
                strokeWidth={viewBoxStroke(size)}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </House>
        ),
      }}
      />
      <Tabs.Screen 
      name="listings"
       options={{
          title: "Listings",
          tabBarIcon: ({ color, size, focused }) => (
            <ClipboardList color={color} size={size} fill={focused ? color : "none"} {...iconProps}>
              {/* Keep the list lines visible when the clipboard is filled */}
              {focused && (
                <Path
                  d="M12 11h4M12 16h4M8 11h.01M8 16h.01"
                  fill="none"
                  stroke="white"
                  strokeWidth={viewBoxStroke(size)}
                  strokeLinecap="round"
                />
              )}
            </ClipboardList>
          ),
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
            // Soft radial orange halo plus a tighter glow under the button
            // (boxShadow keeps the orange tint on Android too)
            boxShadow: "0px 0px 28px 10px rgba(163, 57, 0, 0.22), 0px 4px 10px rgba(163, 57, 0, 0.35)",
           }}
          >
            <Plus size={26} color="white" {...iconProps} />
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
          tabBarIcon: ({ color, size, focused }) => (
            <Heart color={color} size={size} fill={focused ? color : "none"} {...iconProps} />
          ),
        }}
      />
      <Tabs.Screen 
      name="profile"
      options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <User color={color} size={size} fill={focused ? color : "none"} {...iconProps} />
          ),
        }}
      />
    </Tabs>
    </View>
  );
}