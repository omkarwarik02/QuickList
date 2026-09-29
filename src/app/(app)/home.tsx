import HomeListingCard from "@/components/HomeListingCard";
import { Search } from "lucide-react-native";
import { useFocusEffect } from "expo-router";
import { categories } from "@/constants/categories";
import { useAllListing } from "@/hooks/useAllListings";
import { View, TextInput, FlatList, Text, ActivityIndicator, Pressable } from "react-native";
import { useCallback, useMemo, useState } from "react";





export default function HomeScreen() {
const { listings, loading, error,fetch} = useAllListing();
const [selectedCategory, setSlectedCategory] = useState("all");
const [search, setSearch] = useState("");

useFocusEffect(
  useCallback(()=>{
    fetch();
  },[fetch]),
);

const filteredListing = useMemo(()=>{
  return listings.filter((l)=>{
    const matchesCategory = selectedCategory === "all" || l.category === selectedCategory;
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
},[listings, selectedCategory, search])







  return (
    <View>
      <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-xl font-bold text-primary">Home</Text>
    </View>
    <View>
       <FlatList
    data={filteredListing}
    keyExtractor={(item) => item._id}
    refreshing={loading}
    onRefresh={fetch}
    renderItem={({item})=> <HomeListingCard listing={item} />}
    contentContainerClassName="pb-4"
    ListEmptyComponent={
      loading ? (
        <ActivityIndicator className="mt-10"/>
      ) : error ? (
        <Text className="text-center mt-10 text-red">{error}</Text>
      ) : (
        <Text className="text-center mt-10 text-gray-400">No listings found</Text>
      )
    }
    >

    </FlatList>
    </View>

    </View>
    
   

    

  )
  }