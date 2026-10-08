import { router, Tabs, usePathname } from "expo-router";
import TopBar from "@/components/TopBar";
import { Platform, Text, View, useWindowDimensions } from "react-native";
import { House, ClipboardList, Plus, Heart, User } from "lucide-react-native";
import { Path } from "react-native-svg";
import { TAB_BAR_HEIGHT, useTabBarInset } from "@/hooks/useTabBarInset";

// Same rendered stroke thickness for every tab icon, regardless of icon size
const STROKE_WIDTH = 2;
const iconProps = { strokeWidth: STROKE_WIDTH, absoluteStrokeWidth: true };
// Stroke width in the icon's 24-unit viewBox, for detail paths drawn on top of a filled icon
const viewBoxStroke = (size: number) => (STROKE_WIDTH * 24) / size;

// Compact notch-style pill: at most this wide, centered, and never closer than the min margin to the edges
const TAB_BAR_MAX_WIDTH = 260;
const TAB_BAR_MIN_SIDE_MARGIN = 24;

// Page name shown under the top bar, since the tab bar shows icons only
const PAGE_TITLES: Record<string, string> = {
  "/home": "Home",
  "/interests": "Interests",
  "/listings": "My Listings",
  "/profile": "Profile",
};

export default function AppTabsLayout() {
  const { width } = useWindowDimensions();
  const tabBarInset = useTabBarInset();
  // Float the bar above the gesture/home indicator instead of padding it inside the bar
  const tabBarBottom = tabBarInset - TAB_BAR_HEIGHT;
  const tabBarSideMargin = Math.max(TAB_BAR_MIN_SIDE_MARGIN, (width - TAB_BAR_MAX_WIDTH) / 2);
  const pageTitle = PAGE_TITLES[usePathname()];

  return (
    <View style={{ flex: 1 }}>
       <TopBar />
      {pageTitle && (
        <View className="bg-background px-4 pt-1">
          <Text className="text-[13px] font-semibold uppercase tracking-widest text-gray-500">
            {pageTitle}
          </Text>
        </View>
      )}
    <Tabs
      screenOptions={{ headerShown: false,tabBarActiveTintColor: "#A33900",  tabBarInactiveTintColor: "#9CA3AF",
      // Screens end at the top of the floating bar, so no content shows under or beside it
      sceneStyle: { backgroundColor: "#F7F7F8", paddingBottom: tabBarInset },
      // Icons only; each page shows its own name instead
      tabBarShowLabel: false,
      // Center icon vertically. The inner pressable copies `flex` from this style and
      // top-aligns its content, so drop `flex` (use flexGrow/flexBasis to keep equal widths)
      // and let this outer view do the centering.
      tabBarItemStyle: { flex: undefined, flexGrow: 1, flexBasis: 0, justifyContent: "center" },
      // Narrow floating pill with a thin light-gray border and soft shadow
      tabBarStyle: {
        position: "absolute",
        // start/end, not left/right: the navigator's own style sets start: 0 / end: 0,
        // which take priority over left/right and would stretch the bar to full width
        start: tabBarSideMargin,
        end: tabBarSideMargin,
        // Just above the safe-area edge, so the bar clears the home indicator / gesture bar
        bottom: tabBarBottom,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        // Half the height, so the ends are fully round
        borderRadius: TAB_BAR_HEIGHT / 2,
        backgroundColor: "#FFFFFF",
        height: TAB_BAR_HEIGHT,
        // The navigator adds insets.bottom as padding by default, which squashes the icons in a fixed-height bar
        paddingBottom: 0,
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
          },
          android: {
            elevation: 8,
          },
        }),
      },
    }}

    >
      <Tabs.Screen 
      name="home"
      options={{
          title: "Home",
        // Home scrolls under the floating bar; its list pads itself instead
        sceneStyle: { backgroundColor: "#F7F7F8", paddingBottom: 0 },
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
      name="interests"
      options={{
          title: "Interests",
          tabBarIcon: ({ color, size, focused }) => (
            <Heart color={color} size={size} fill={focused ? color : "none"} {...iconProps} />
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
            width:44,
            height:44,
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
      name="profile"
      options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <User color={color} size={size} fill={focused ? color : "none"} {...iconProps} />
          ),
        }}
      />
      {/* Detail screen lives in the tab group so the tab bar stays visible, but gets no tab of its own */}
      <Tabs.Screen name="listing/[id]" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
    </View>
  );
}