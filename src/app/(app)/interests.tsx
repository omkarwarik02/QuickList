import ListingCard from "@/components/ListingCard";
import { useInterests } from "@/hooks/useInterests";
import { useFocusEffect, useRouter } from "expo-router";
import { HeartOff } from "lucide-react-native";
import { useCallback, type ComponentProps } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

export default function InterestsScreen() {
  const router = useRouter();
  const { listings, loading, error, refetch } = useInterests();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#1F2B4D" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-[#1F2B4D] text-center">{error}</Text>
      </View>
    );
  }
  if (listings.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <HeartOff size={40} color="#9CA3AF" />
        <Text className="text-gray-500 mt-3 text-center">
          No interested listings yet. Tap Contact Seller on a listing to save it
          here.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 pt-3">
      <FlatList
        ListHeaderComponent={
          // Count card, styled like the stats card on the listings page
          <View className="w-full h-[100px] mb-5 items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <Text className="text-xl text-gray-500 tracking-wide">SAVED</Text>
            <View className="flex-row items-baseline gap-1 mt-1">
              <Text className="text-3xl font-bold text-[#A33900]">{listings.length}</Text>
              <Text className="text-sm text-gray-500">items</Text>
            </View>
          </View>
        }
        data={listings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/listing/[id]",
                params: { id: item._id },
              })
            }
          >
            <ListingCard
              listing={item}
            />
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
