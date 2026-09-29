import HomeListingCard from "@/components/HomeListingCard";
import { Search, X, SlidersHorizontal, LayoutGrid } from "lucide-react-native";
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
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import { ScrollView } from "react-native";

// "All" is home-only; the shared categories list is also used when creating a listing
const homeCategories = [
  { id: "all", label: "All", Icon: LayoutGrid },
  ...categories,
];

export default function HomeScreen() {
  const { listings, loading, error, fetch } = useAllListing();
  const [selectedCategory, setSlectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetch();
    }, [fetch]),
  );

  const filteredListing = useMemo(() => {
    return listings.filter((l) => {
      const matchesCategory =
        selectedCategory === "all" || l.category === selectedCategory;
      const matchesSearch = l.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [listings, selectedCategory, search]);

  return (
    <View className="px-4 py-4">
      <View className="flex-row items-center rounded-xl border bg-white border border-gray-200 px-3 py-1 mb-5">
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
            className="mt-3 grow-0"
      
      >
        <View className="flex-row px-4 gap-2 mb-5 ">
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

     

      <View>
        <FlatList
          data={filteredListing}
          keyExtractor={(item) => item._id}
          refreshing={loading}
          onRefresh={fetch}
          renderItem={({ item }) => <HomeListingCard listing={item} />}
          contentContainerClassName="pb-4"
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator className="mt-10" />
            ) : error ? (
              <Text className="text-center mt-10 text-red">{error}</Text>
            ) : (
              <Text className="text-center mt-10 text-gray-400">
                No listings found
              </Text>
            )
          }
        ></FlatList>
      </View>
    </View>
  );
}
