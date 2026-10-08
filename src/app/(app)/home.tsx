import HomeListingCard from "@/components/HomeListingCard";
import { Search, LayoutGrid , Zap } from "lucide-react-native";
import { useFocusEffect } from "expo-router";
import { categories } from "@/constants/categories";
import { useAllListing } from "@/hooks/useAllListings";
import {
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";
import { CARD_GAP } from "@/constants/layout";
import { useCallback, useMemo, useRef, useState } from "react";
import { useNearByListing } from "@/hooks/useNearByListing";
import { useTabBarInset } from "@/hooks/useTabBarInset";

// "All" is home-only; the shared categories list is also used when creating a listing
const homeCategories = [
  { id: "all", label: "All", Icon: LayoutGrid },
  ...categories,
];

export default function HomeScreen() {
  const tabBarInset = useTabBarInset();
  const allListing = useAllListing();
  const nearbyListing = useNearByListing();
  const fetchAll = allListing.fetch;
  const fetchNearby = nearbyListing.fetch;
  const [isNearbyMode, setIsNearbyMode] = useState(false);
  const [selectedCategory, setSlectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  // The focus effect reads the mode through a ref so toggling Zap doesn't re-run it;
  // a second nearby fetch would mark the Zap fetch stale and flip back to all listings
  const isNearbyModeRef = useRef(false);
  const setNearbyMode = (value: boolean) => {
    isNearbyModeRef.current = value;
    setIsNearbyMode(value);
  };

  useFocusEffect(
    useCallback(() => {
      if(isNearbyModeRef.current){
        fetchNearby();
      }else {
        fetchAll();
      }
    }, [fetchAll, fetchNearby]),
  );

  const active = isNearbyMode ? nearbyListing : allListing;

  const handleZapPress = async () => {
    if(active.loading) return;
    if(isNearbyMode){
      setNearbyMode(false);
      fetchAll();
    } else {
      setNearbyMode(true);
      const success = await fetchNearby();
      if(!success) setNearbyMode(false);
    }
  }

 

  const filteredListing = useMemo(() => {
    return active.listings.filter((l) => {
      const matchesCategory =
        selectedCategory === "all" || l.category === selectedCategory;
      const matchesSearch = l.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [active.listings, selectedCategory, search]);

  return (
    <View className="flex-1 px-4 py-4">
      <View className="flex-row items-center rounded-xl border bg-white border-gray-200 px-3 py-1 mb-5">
        <Search size={18} color="#9CA3AF" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search listings...."
          className="flex-1 ml-2 text-base text-gray-900"
          placeholderTextColor="#9CA3AF"
        ></TextInput>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-3 grow-0 shrink-0"
      >
        <View className="flex-row gap-2 mb-5">
          {homeCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => setSlectedCategory(cat.id)}
                className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${isSelected ? "bg-[#A33900]" : "bg-gray-200"} `}
              >
                <cat.Icon size={16} color={isSelected ? "white" : "#5A4138"} />
                <Text
                  className={
                    isSelected ? "text-white font-semibold" : "text-gray-700"
                  }
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      

      <View className="flex-1">
        <FlatList
          data={filteredListing}
          numColumns={2}
          columnWrapperStyle={{ gap: CARD_GAP }}
          // Content scrolls under the floating tab bar, but the last row can still scroll above it
          contentContainerStyle={{ gap: CARD_GAP, paddingBottom: tabBarInset + 16 }}
          keyExtractor={(item) => item._id}
          // While the list is empty, ListEmptyComponent shows the loader; don't show the refresh spinner too
          refreshing={active.loading && active.listings.length > 0}
          onRefresh={active.fetch}
          onEndReached={()=>active.loadMore()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            active.loadingMore ?(
              <ActivityIndicator className="my-4" color="#A33900" />
            ) : null
          }
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <HomeListingCard listing={item} />
            </View>
          )}
          contentContainerClassName="pb-4"
          ListEmptyComponent={
            active.loading ? (
              <ActivityIndicator className="mt-10" />
            ) : active.error ? (
              <Text className="text-center mt-10 text-red-500">{active.error}</Text>
            ) : (
              <Text className="text-center mt-10 text-gray-400">
                  {isNearbyMode ? "No listings found nearby" : "No listings found"}
              </Text>
            )
          }
        ></FlatList>
      </View>
          <Pressable
        onPress={handleZapPress}
        disabled={active.loading}
        style={{
          position: "absolute",
          right: 16,
          // The screen extends under the floating tab bar, so sit above the bar's top edge
          bottom: tabBarInset + 16,
          backgroundColor: isNearbyMode ? "#A33900" : "white",
          borderRadius: 999,
          padding: 14,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        {active.loading?(
          <ActivityIndicator size="small" color={isNearbyMode ? "white" : "#5A4138"} />
        ):(
          <Zap size={22} color={isNearbyMode ? "white" : "#5A4138"} />
        )  
        }

      </Pressable>

    </View>
  );
}
