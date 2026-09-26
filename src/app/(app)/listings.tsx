import SlidingTabs from "@/components/SlidingTabs";
import { useMyListing } from "@/hooks/useMyListing";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ListingCard from "@/components/ListingCard";
// No SafeAreaView here: the TopBar in (app)/_layout.tsx already handles the top inset.
export default function MyListingsScreen() {
  const { listing, loading, error, removeListing, refetch } = useMyListing();
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const activeCount = listing.filter((l) => l.status === "active").length;
  const completedCount = listing.filter((l) => l.status === "completed").length;
 const filteredListings = listing.filter((l) => l.status === activeTab);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 px-4 pt-3">
        <View className="self-start flex-row items-center gap-1.5 rounded-full bg-[#FFEDD5] px-3 py-1">
          <View className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <Text className="text-xs font-medium text-[#A33900] tracking-wide">
            Live
          </Text>
        </View>

        <View className="flex-row w-full h-[100px] mt-5 px-4 items-center rounded-2xl border border-gray-200 bg-white justify-around">
          <View className="items-center">
            <Text className="text-xl text-gray-500 tracking-wide">ACTIVE</Text>
            <View className="flex-row items-baseline gap-1 mt-1">
              <Text className="text-3xl font-bold text-[#A33900]">{activeCount}</Text>
              <Text className="text-sm text-gray-500">items</Text>
            </View>
          </View>
          <View className="w-px h-[50px] bg-gray-200"></View>
          <View className="items-center">
            <Text className="text-xl text-gray-500 tracking-wide">SOLD</Text>
            <View className="flex-row items-baseline gap-1 mt-1">
              <Text className="text-3xl font-bold text-[#A33900]">{completedCount}</Text>
              <Text className="text-sm text-gray-500">items</Text>
            </View>
          </View>
        </View>

        <View className="mt-5">
          <SlidingTabs
            tabs={[
              { value: "active", label: `Active (${activeCount})` },
              { value: "completed", label: `Completed (${completedCount})` },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </View>

        <View className="flex-1 mt-5">
          <FlatList
            data={filteredListings}
            keyExtractor={(item) => item._id}
            onRefresh={refetch}
            renderItem={({ item }) => <ListingCard listing={item} onDelete={removeListing} />}
            contentContainerClassName="pb-4"
            ListEmptyComponent={
              <View className="items-center mt-10">
                {loading ? (
                  <ActivityIndicator color="#A33900" />
                ) : (
                  <Text className="text-gray-500">
                    {error ?? (activeTab === "active" ? "No active listings yet." : "No completed listings yet.")}
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
