import { useRouter } from "expo-router";
import { checkUser } from "@/utils/checkUser";
import { ActivityIndicator, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { User as UserIcon , Package, ChevronRight, Pencil} from "lucide-react-native";
import { Image,TextInput,Pressable, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");

const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    checkUser()
      .then((data) => {
        if (!cancelled) setUser(data);
      })
      .catch((error) => {
        console.error("Failed to load user:", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);
  if (loading) {
    return <ActivityIndicator className="mt-10" />;
  }

  if (!user) {
    return <Text>Could not load profile</Text>;
  }


   const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace("/login"); // adjust to your actual login route
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Could not log out", "Please try again.");
    }
  }
return (
  <View className="flex-1 bg-[#EDE6D6] px-4 pt-6">
    <View className="rounded-2xl bg-white p-4">
      {/* Header: photo + name */}
      <View className="flex-row items-center">
        {user.photoUrl ? (
          <Image
            source={{ uri: user.photoUrl }}
            className="w-16 h-16 rounded-lg"
          />
        ) : (
          <View className="w-16 h-16 rounded-lg bg-gray-200 items-center justify-center">
            <UserIcon size={28} color="#9CA3AF" />
          </View>
        )}

        <View className="ml-4">
          <Text className="text-lg font-bold text-[#1F2B4D]">
            {user.name || "Unknown"}
          </Text>
          <Text className="text-sm text-gray-500">
            {user.location ? ` · ${user.location}` : ""}
          </Text>
        </View>
      </View>

      {/* Divider — once, below the whole header */}
      <View className="border-b border-dashed border-gray-400 my-4" />

      {/* Data rows */}
      <View className="gap-2">
        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-500">Phone</Text>
          <Text className="text-sm text-[#1F2B4D]">{user.phone || "Not set"}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-500">Email</Text>
          <Text className="text-sm text-[#1F2B4D]">{user.email || "No email"}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-500">Member since</Text>
          <Text className="text-sm text-[#1F2B4D]">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>
      </View>
    </View>
    <Pressable
        onPress={() => router.push("/listings")}
        className="flex-row items-center justify-between bg-[#1F2B4D] rounded-xl px-4 py-3 mt-4"
      >
        <View className="flex-row items-center gap-3">
          <Package size={18} color="white" />
          <Text className="text-white font-semibold">My Listings</Text>
        </View>
        <ChevronRight size={18} color="white" />
      </Pressable>

      {/* Edit Profile */}
      <Pressable
        onPress={() => router.push("/../components/profileEdit")}
        className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 mt-3"
      >
        <View className="flex-row items-center gap-3">
          <Pencil size={18} color="#1F2B4D" />
          <Text className="text-[#1F2B4D] font-medium">Edit Profile</Text>
        </View>
        <ChevronRight size={18} color="#9CA3AF" />
      </Pressable>

      {/* Log Out */}
      <Pressable
        onPress={handleLogout}
        className="items-center py-4 mt-2"
      >
        <Text className="text-gray-500">Log Out</Text>
      </Pressable>
  </View>
);
}