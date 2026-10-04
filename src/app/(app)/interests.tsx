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
      <View className="flex-1 items-center justify-center bg-[#EDE6D6]">
        <ActivityIndicator color="#1F2B4D" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-[#EDE6D6] px-6">
        <Text className="text-[#1F2B4D] text-center">{error}</Text>
      </View>
    );
  }
  if (listings.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#EDE6D6] px-6">
        <HeartOff size={40} color="#9CA3AF" />
        <Text className="text-gray-500 mt-3 text-center">
          No interested listings yet. Tap Contact Seller on a listing to save it
          here.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1bg-[#EDE6D6] px-4 pt-4">
      <Text className="text-xl font-bold text-[#1F2B4D]">My Interests</Text>
      <FlatList
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
