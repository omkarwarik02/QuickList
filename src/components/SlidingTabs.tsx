import { View, Text, Pressable, Animated } from "react-native";
import { useSlidingTabs } from "@/hooks/useSlidingTabs";

type Tab<T extends string> = { value: T; label: string };

export default function SlidingTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  activeColor = "#A33900",
  trackColor = "#F0EDE8",
}: {
  tabs: Tab<T>[];
  activeTab: T;
  onChange: (value: T) => void;
  activeColor?: string;
  trackColor?: string;
}) {
  const { translateX, onContainerLayout, pillWidthStyle } = useSlidingTabs(tabs, activeTab);

  return (
    <View
      onLayout={onContainerLayout}
      className="w-full h-[40px] rounded-full flex-row relative"
      style={{ backgroundColor: trackColor }}
    >
      <Animated.View
        style={{ width: pillWidthStyle, transform: [{ translateX }], backgroundColor: activeColor }}
        className="absolute top-1 bottom-1 left-1 rounded-full"
      />

      {tabs.map((tab) => (
        <Pressable
          key={tab.value}
          onPress={() => onChange(tab.value)}
          className="flex-1 items-center justify-center z-10"
        >
          <Text className={activeTab === tab.value ? "text-white font-semibold" : "text-gray-600"}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}