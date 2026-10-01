import { CARD_WIDTH } from "@/constants/layout";
import { Listing } from "@/hooks/useAllListings";
import { router } from "expo-router";
import { Share2 } from "lucide-react-native";
import { Image, Pressable, Share, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { timeAgo } from "@/utils/timeAgo";
import CategoryPill from "@/components/CategoryPill";

export default function HomeListingCard({ listing }: { listing: Listing }) {
  const pressed = useSharedValue(0);
  const pressStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { rotateX: `${pressed.value * 6}deg` },
      { scale: 1 - pressed.value * 0.03 },
    ],
  }));

  const handlShare = () => {
    Share.share({
      message: `Check out "${listing.title}" for ₹${listing.price} on QuickList!`,
    });
  };

  return (
    <Pressable
      style={{ width: CARD_WIDTH }}
      className="mb-3 rounded-xl overflow-hidden bg-white border border-gray-100 "
      onPress={() =>
  router.push({
    pathname: "/listing/[id]",
    params: { id: listing._id },
  })
}
      onPressIn={() => (pressed.value = withSpring(1))}
      onPressOut={() => (pressed.value = withSpring(0))}
    >
      <Animated.View
        style={[
          {
            backgroundColor: "white",
            borderRadius: 16,
            boxShadow:
              "0px 1px 2px rgba(0,0,0,0.06), 0px 6px 16px rgba(0,0,0,0.08)",
          },
          pressStyle,
        ]}
      >
        <View className="bg-white rounded-2xl p-4 border border-gray-100">
          <View className="relative">
            {listing.photos[0] ? (
              <Image
                source={{ uri: listing.photos[0] }}
                className="w-full h-32 rounded-xl"
              />
            ) : (
              <View className="w-full h-32 rounded-xl bg-gray-100" />
            )}
            {listing.photos.length > 1 && (
              <View className="absolute top-1 left-1 bg-black/60 rounded px-1.5 py-0.5">
                <Text className="text-white text-[10px] font-semibold">
                  {listing.photos.length}
                </Text>
              </View>
            )}
          </View>

          <View className="mt-2">
            <View className="flex-row items-center justify-between gap-2">
              <CategoryPill category={listing.category} size="sm" />
              <Text className="text-[11px] text-gray-500">{timeAgo(listing.createdAt)}</Text>
            </View>

            <Text className="font-semibold text-base mt-1">
              {listing.title}
            </Text>
            <Text className="text-[#A33900] font-bold text-lg mt-1">
              ₹ {listing.price}
            </Text>
          </View>

          <View className="flex-row justify-center items-center mt-3 pt-3 border-t border-gray-100">
            <Pressable
              onPress={handlShare}
              className="flex-row items-center gap-1"
            >
              <Share2 size={16} color="#666" />
              <Text className="text-sm text-gray-600">Share</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
