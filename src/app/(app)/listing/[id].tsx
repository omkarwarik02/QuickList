import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Pressable,
  Share,
  Linking,
  useWindowDimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Share2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  ImageOff,
} from "lucide-react-native";
import { useListing } from "@/hooks/useListing";
import CategoryPill from "@/components/CategoryPill";
import { timeAgo } from "@/utils/timeAgo";

const BRAND = "#A33900";
const GALLERY_HEIGHT = 320;

export default function ListingDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { listing, loading, error, fetch } = useListing(id);
  const { width } = useWindowDimensions();
  const [photoIndex, setPhotoIndex] = useState(0);
  // Tab screens stay mounted, so start each newly opened listing on its first photo
  const [photosFor, setPhotosFor] = useState(id);
  if (photosFor !== id) {
    setPhotosFor(id);
    setPhotoIndex(0);
  }
  const photoListRef = useRef<FlatList<string>>(null);

  const goToPhoto = (index: number) => {
    photoListRef.current?.scrollToOffset({ offset: index * width, animated: true });
    setPhotoIndex(index);
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleShare = () => {
    if (!listing) return;
    Share.share({
      message: `Check out "${listing.title}" for ₹${listing.price} on QuickList!`,
    });
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/home");
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F7F7F8]">
        <ActivityIndicator size="large" color={BRAND} />
      </View>
    );
  }

  if (error || !listing) {
    return (
      <View className="flex-1 items-center justify-center px-8 bg-[#F7F7F8]">
        <Text className="text-lg font-semibold text-gray-900">{"Couldn't load this listing"}</Text>
        <Text className="text-sm text-gray-500 mt-1 text-center">
          {error ?? "It may have been removed."}
        </Text>
        <View className="flex-row gap-3 mt-6">
          <Pressable
            onPress={handleBack}
            className="px-5 py-2.5 rounded-full border border-gray-300"
          >
            <Text className="font-semibold text-gray-700">Go back</Text>
          </Pressable>
          {error ? (
            <Pressable onPress={fetch} className="px-5 py-2.5 rounded-full bg-[#A33900]">
              <Text className="font-semibold text-white">Try again</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }

  const isSold = listing.status === "completed";
  const photoCount = listing.photos.length;

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Gallery */}
        <View style={{ height: GALLERY_HEIGHT }} className="bg-gray-100">
          {photoCount > 0 ? (
            <FlatList
              ref={photoListRef}
              data={listing.photos}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(uri, index) => `${index}-${uri}`}
              onMomentumScrollEnd={(e) =>
                setPhotoIndex(Math.round(e.nativeEvent.contentOffset.x / width))
              }
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{ width, height: GALLERY_HEIGHT }}
                  resizeMode="cover"
                />
              )}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <ImageOff size={40} color="#9CA3AF" />
              <Text className="text-gray-400 mt-2">No photos</Text>
            </View>
          )}

          {/* Top overlay: back + share */}
          <View className="absolute top-4 left-4 right-4 flex-row justify-between">
            <Pressable
              onPress={handleBack}
              hitSlop={8}
              className="w-10 h-10 rounded-full bg-white/90 items-center justify-center"
            >
              <ArrowLeft size={20} color="#111827" />
            </Pressable>
            <Pressable
              onPress={handleShare}
              hitSlop={8}
              className="w-10 h-10 rounded-full bg-white/90 items-center justify-center"
            >
              <Share2 size={18} color="#111827" />
            </Pressable>
          </View>

          {photoCount > 1 && (
            <>
              {photoIndex > 0 && (
                <Pressable
                  onPress={() => goToPhoto(photoIndex - 1)}
                  hitSlop={8}
                  className="absolute left-4 top-1/2 -mt-5 w-10 h-10 rounded-full bg-black/40 items-center justify-center"
                >
                  <ChevronLeft size={22} color="white" />
                </Pressable>
              )}
              {photoIndex < photoCount - 1 && (
                <Pressable
                  onPress={() => goToPhoto(photoIndex + 1)}
                  hitSlop={8}
                  className="absolute right-4 top-1/2 -mt-5 w-10 h-10 rounded-full bg-black/40 items-center justify-center"
                >
                  <ChevronRight size={22} color="white" />
                </Pressable>
              )}

              {/* Dots sit above the sheet's rounded overlap */}
              <View className="absolute bottom-9 left-0 right-0 flex-row justify-center gap-1.5">
                {listing.photos.map((_, i) => (
                  <View
                    key={i}
                    className={`h-1.5 rounded-full ${i === photoIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"}`}
                  />
                ))}
              </View>
            </>
          )}
        </View>

        {/* Details sheet, overlapping the gallery */}
        <View className="-mt-5 rounded-t-3xl bg-white px-5 pt-6 pb-8">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <CategoryPill category={listing.category} />
              {isSold ? (
                <View className="rounded-full px-3 py-1.5 bg-gray-900">
                  <Text className="text-xs font-semibold text-white">Sold</Text>
                </View>
              ) : null}
            </View>
            <View className="flex-row items-center gap-1">
              <Clock size={13} color="#9CA3AF" />
              <Text className="text-xs text-gray-500">{timeAgo(listing.createdAt)}</Text>
            </View>
          </View>

          <Text className="text-2xl font-bold text-gray-900 mt-4">{listing.title}</Text>
          <Text className="text-3xl font-extrabold text-[#A33900] mt-2">
            ₹ {listing.price.toLocaleString("en-IN")}
          </Text>

          {listing.location?.name ? (
            <View className="flex-row items-center gap-1.5 mt-3">
              <MapPin size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 flex-1" numberOfLines={2}>
                {listing.location.name}
              </Text>
            </View>
          ) : null}

          <View className="h-px bg-gray-100 my-5" />

          <Text className="text-base font-semibold text-gray-900">Description</Text>
          <Text className="text-[15px] text-gray-600 mt-2 leading-6">
            {listing.description?.trim() || "No description provided."}
          </Text>
        </View>
      </ScrollView>

      {/* Sticky contact bar */}
      {listing.phoneNumber && !isSold ? (
        <View className="px-4 py-3 bg-white border-t border-gray-100">
          <Pressable
            onPress={() => Linking.openURL(`tel:${listing.phoneNumber}`)}
            className="h-12 rounded-xl bg-[#A33900] flex-row items-center justify-center gap-2"
          >
            <Phone size={18} color="white" />
            <Text className="text-white font-semibold text-base">Call seller</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
