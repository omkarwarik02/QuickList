import { View, Text, Image, Pressable, Share, Alert, Platform } from "react-native";
import { Share2, MoreVertical } from "lucide-react-native";
import { Listing } from "@/hooks/useMyListing";

function timeAgo(dateString:string){
    const diffMs = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    if(hours < 1) return "just now";
    if(hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if(days === 1) return "Yesterday";
    return `${days}d ago`;
}

export default function ListingCard({
    listing,
    onDelete,
}:{
    listing: Listing;
    onDelete:(id:string) => void;
}){
    const handleShare = () => {
    Share.share({
      message: `Check out "${listing.title}" for ₹${listing.price} on QuickList!`,
    });

}
  // One confirm dialog only: opening a second Alert from inside another Alert's
  // button is silently dropped on iOS (and some Android versions).
  const handleMorePress = () => {
    if (Platform.OS === "web") {
      // Alert.alert buttons don't work on web
      if (window.confirm(`Delete "${listing.title}"? This can't be undone.`)) {
        onDelete(listing._id);
      }
      return;
    }
    Alert.alert(`Delete "${listing.title}"?`, "This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => onDelete(listing._id) },
    ]);
  };



  return (
    <View className="bg-white rounded-2xl p-3 mb-3">
        <View className="flex-row">
            <View className="relative">
                {listing.photos[0] ? (
                    <Image source={{uri: listing.photos[0]}} className="w-20 h-20 rounded-xl"/>
                ) : (
                    <View className="w-20 h-20 rounded-xl bg-gray-100" />
                )}
                {listing.photos.length > 1 && (
                    <View className="absolute top-1 left-1 bg-black/60 rounded px-1.5 py-0.5">
                        <Text className="text-white text-[10px] font-semibold">{listing.photos.length}</Text>
                    </View>
                )}
            </View>

            <View className="flex-1 ml-3 justify-center">
                <View className="flex-row justify-between">
                    <View className=" rounded-full py-2 px-2 bg-[#FFEDD5]">
                        <Text className="text-xs font-semibold text-[#A33900] uppercase tracking-wide">{listing.category}</Text>
                    </View>
                    <Text className="text-xs">{timeAgo(listing.createdAt)}</Text>
                    

                </View>

                <Text className="font-semibold text-base mt-1">{listing.title}</Text>
                <Text className="text-[#A33900] font-bold text-lg mt-1">₹ {listing.price}</Text>
            </View>
        </View>

        <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <Pressable onPress={handleShare} className="flex-row items-center gap-1">
                <Share2 size={16} color="#666"/>
                <Text className="text-sm text-gray-600">Share</Text>
            </Pressable>
            <Pressable onPress={handleMorePress} hitSlop={10}>
                <MoreVertical size={18} color="#666" />

            </Pressable>

        </View>

    </View>
  )












































};