import { checkUser } from "@/utils/checkUser";
import { updateProfile } from "@/utils/updateProfile";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    let cancelled = false;

    checkUser()
      .then((user) => {
        if (cancelled) return;
        setPhone(user?.phone ?? "");
        setLocation(user?.location ?? "");
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

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await updateProfile(phone.trim(), location.trim());
      Alert.alert("Saved", "Your profile has been updated.");
      router.back();
    } catch (error) {
      console.error("Save profile error:", error);
      Alert.alert("Something went wrong", "Could not save your profile. Try again.");
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 bg-[#EDE6D6]">
      <SafeAreaView className="flex-1 bg-[#EDE6D6]">
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <ArrowLeft size={24} color="#1F2B4D" />
          </Pressable>
          <Text className="text-xl font-bold text-[#1F2B4D] ml-3">Edit Profile</Text>
        </View>

        {loading ? (
          <ActivityIndicator className="mt-10" />
        ) : (
          <View className="flex-1 justify-center px-4 pb-24">
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">Phone number</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="e.g. 9876543210"
                keyboardType="phone-pad"
                className="border border-gray-200 rounded-xl px-3 py-2 text-base text-gray-900 bg-white"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm text-gray-600 mb-1">Location</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="e.g. Navi Mumbai"
                className="border border-gray-200 rounded-xl px-3 py-2 text-base text-gray-900 bg-white"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <Pressable
              onPress={handleSave}
              disabled={saving}
              className={`bg-[#1F2B4D] rounded-xl py-3 items-center ${saving ? "opacity-60" : ""}`}
            >
              <Text className="text-white font-semibold">
                {saving ? "Saving..." : "Save changes"}
              </Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
