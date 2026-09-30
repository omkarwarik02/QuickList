// constants/layout.ts
import { Dimensions } from "react-native";

export const CARD_GAP = 18;
export const SIDE_PADDING = 16;
export const CARD_WIDTH = (Dimensions.get("window").width - SIDE_PADDING * 2 - CARD_GAP) / 2;