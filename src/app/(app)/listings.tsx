import { useMyListing } from "@/hooks/useMyListing";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import ListingCard from "@/components/ListingCard";
import { useCallback } from "react";



// No SafeAreaView here: the TopBar in (app)/_layout.tsx already handles the top inset.
export default function MyListingsScreen() {
  const { listing, loading, error, removeListing, refetch } = useMyListing();


useFocusEffect( 
  useCallback(()=>{
    refetch();
  },[refetch])
);






  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 px-4 pt-3">
        <View className="self-start flex-row items-center gap-1.5 rounded-full bg-[#FFEDD5] px-3 py-1">
          <View className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <Text className="text-xs font-medium text-[#A33900] tracking-wide">
            Live
          </Text>
        </View>

        {/* Count card, styled like the SAVED card on the interests page */}
        <View className="w-full h-[100px] mt-5 items-center justify-center rounded-2xl border border-gray-200 bg-white">
          <Text className="text-xl text-gray-500 tracking-wide">ACTIVE</Text>
          <View className="flex-row items-baseline gap-1 mt-1">
            <Text className="text-3xl font-bold text-[#A33900]">{listing.length}</Text>
            <Text className="text-sm text-gray-500">items</Text>
          </View>
        </View>

        <View className="flex-1 mt-5">
          <FlatList
            data={listing}
            keyExtractor={(item) => item._id}
             refreshing={loading}
            onRefresh={refetch}
            renderItem={({ item }) => <ListingCard listing={item} onDelete={removeListing} />}
            contentContainerClassName="pb-4"
            ListEmptyComponent={
              <View className="items-center mt-10">
                {loading ? (
                  <ActivityIndicator color="#A33900" />
                ) : (
                  <Text className="text-gray-500">
                    {error ?? "No listings yet."}
                  </Text>
                )}
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}
