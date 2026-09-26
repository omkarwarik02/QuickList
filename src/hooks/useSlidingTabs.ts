import { useState, useEffect } from "react";
import { Animated, LayoutChangeEvent } from "react-native";

export function useSlidingTabs<T extends string>(
  tabs: { value: T; label: string }[],
  activeTab: T
) {
  const [containerWidth, setContainerWidth] = useState(0);
  // useState (not useRef) so the Animated.Value is created once and safe to read during render
  const [translateX] = useState(() => new Animated.Value(0));

  const activeIndex = tabs.findIndex((t) => t.value === activeTab);

  const onContainerLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    if (containerWidth === 0) return;
    Animated.timing(translateX, {
      toValue: (containerWidth / tabs.length) * activeIndex,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, containerWidth, tabs.length, translateX]);

  return {
    translateX,
    onContainerLayout,
    pillWidthStyle: containerWidth ? containerWidth / tabs.length - 8 : (`${100 / tabs.length}%` as const),
  };
}