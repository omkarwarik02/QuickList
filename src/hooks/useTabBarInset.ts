import { useSafeAreaInsets } from "react-native-safe-area-context";

export const TAB_BAR_HEIGHT = 56;
// Gap between the floating tab bar and the bottom safe-area edge
export const TAB_BAR_BOTTOM_GAP = 4;

// Distance from the screen bottom to the top of the floating tab bar.
// The tab layout pads every screen by this much so content ends above the bar.
export function useTabBarInset() {
  const insets = useSafeAreaInsets();
  return insets.bottom + TAB_BAR_BOTTOM_GAP + TAB_BAR_HEIGHT;
}
