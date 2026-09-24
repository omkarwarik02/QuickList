import { categories } from "@/constants/categories";
import { useCreateListing } from "@/hooks/useCreateListing";
import { useRouter } from "expo-router";
import { Plus, X, LocateIcon } from "lucide-react-native";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useListSubmit from "@/hooks/useListSubmit";

export default function CreateList() {
  const {
    photos,
    pickImages,
    removePhoto,
    maxPhotos,
    title,
    setTitle,
    selectedCategory,
    setSelectedCategory,
    setPrice,
    price,
    description,
    setDescription,
    location,
    locationLoading,
    detectLocation,
  } = useCreateListing();
  const { submitting, submitError, submitSuccess, submitListing } = useListSubmit();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);



const handleSubmit = async () => {
  const success = await submitListing({
    photos,
    title,
    category:selectedCategory,
    price,
    description,
    location,

  });
  if (success) {
    router.back();
  }
};






  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
          <Pressable onPress={() => router.back()}>
            <X size={24} color="#333" />
          </Pressable>
          <Text className=" font-semibold">Create Listing</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="pb-10"
        >
          <View className="mt-5 flex-row items-center px-4 py-3">
            <Text className="font-semibold text-xl">Photos</Text>
            <Text className="text-xs text-gray-600 ml-2 ">
              (up to {maxPhotos})
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-5 grow-0 mt-3"
          >
            <View className="flex-row gap-3 px-4 pt-4">
              {photos.map((uri) => (
                <View key={uri} className="relative">
                  <Image source={{ uri }} className="w-20 h-20 rounded-xl" />
                  <Pressable
                    onPress={() => removePhoto(uri)}
                    className="absolute -top-2 -right-2 bg-black/70 rounded-full w-5 h-5 items-center justify-center"
                  >
                    <Text className="text-white text-xs">×</Text>
                  </Pressable>
                </View>
              ))}

              {photos.length < maxPhotos && (
                <Pressable
                  onPress={pickImages}
                  className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center"
                >
                  <Plus size={22} color="#9CA3AF" />
                </Pressable>
              )}
            </View>
          </ScrollView>

          <View className="flex-row items-center px-4 py-3 mt-5">
            <Text className=" text-xl font-semibold">Title</Text>
          </View>

          <View className="px-4">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="What are you selling?"
              className="border border-gray-200 rounded-xl px-4 py-3 text-base"
            />
          </View>

          <View className="px-4 mt-5">
            <Text className="text-xl font-semibold mb-3">Category</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 grow-0"
          >
            <View className="flex-row px-4 gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${isSelected ? "bg-[#A33900]" : "bg-gray-100"}`}
                  >
                    <cat.Icon
                      size={16}
                      color={isSelected ? "white" : "#5A4138"}
                    />
                    <Text
                      className={
                        isSelected
                          ? "text-white font-semibold"
                          : "text-gray-700"
                      }
                    >
                      {cat.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
          <View className="px-4 mt-5">
            <Text className="text-xl font-semibold mb-3">Price</Text>
            <TextInput
              value={price}
              onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ""))}
              placeholder="0"
              keyboardType="numeric"
              className="border border-gray-200 rounded-xl px-4 py-3 text-base"
            />
            <View className="flex-row items-center gap-2 mt-2">
              <Image
                source={require("../../assets/images/Tick.png")}
                resizeMode="contain"
                className="w-3 h-3 "
              />
              <Text className=" text-xs text-[#006B6B]">
                0% seller fees-you keep 100%
              </Text>
            </View>
          </View>
          <View className="px-4 mt-5 flex-col">
            <Text className="font-semibold text-xl">Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              onFocus={() =>
                setTimeout(
                  () => scrollRef.current?.scrollToEnd({ animated: true }),
                  300,
                )
              }
              placeholder="Describe your item..."
              multiline
              className="border border-gray-200 rounded-2xl px-4 py-3 text-base bg-white mt-3"
              style={{ textAlignVertical: "top", minHeight: 140 }}
            />
            <Text className="self-end mt-1">{description.length} chars</Text>
          </View>
          <View className="px-4 mt-5 ">
            <Text className="text-xl font-semibold mb-3">Location</Text>

            <Pressable
              onPress={() => detectLocation()}
              className="flex-row items-center justify-between bg-[#FFF6F0] rounded-2xl px-4 py-4"
            >
              <View className="flex-row items-center gap-2 flex-1">
                <LocateIcon size={18} color="#A33900" />
                <Text className="text-base font-medium" numberOfLines={1}>
                  {locationLoading
                    ? "Detecting..."
                    : (location?.name ?? "Tap to detect your location")}
                </Text>
              </View>
              {location && !locationLoading && (
                <Text className="text-sm text-[#A33900] font-semibold ml-2">
                  Change
                </Text>
              )}
            </Pressable>
          </View>
          <View className="px-4 mt-6 mb-4">
            <Pressable className="bg-[#A33900] h-[52px] rounded-full items-center justify-center" onPress={handleSubmit} disabled={submitting}>
              <Text className="text-white text-base font-semibold">
                 {submitting ? "Posting...." : "Post Listing"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
