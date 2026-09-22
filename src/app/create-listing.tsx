import { X,Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, View , Text, ScrollView,Image, } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function CreateList (){
const [photos, setPhotos] = useState<string[]>([]);
const router = useRouter();

const pickImages = async () =>{
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:['images'],
        allowsMultipleSelection:true,
        selectionLimit: 5 - photos.length,
        quality:0.7,
    });

    if(!result.canceled){
        const newUris = result.assets.map((asset)=>asset.uri);
        setPhotos((prev)=> [...prev, ...newUris].slice(0,5))
    }
}

const removePhoto = (uriToRemove:string) => {
    setPhotos((prev)=> prev.filter((uri) => uri !== uriToRemove));
}

return (
<SafeAreaView className="flex-1 bg-white">
<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
<Pressable
onPress={()=> router.back()}>
<X size={24} color="#333"/>
</Pressable>
    <Text className=" font-semibold">
        Create Listing
    </Text>
      <View style={{ width: 24 }} />
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
    <View className="flex-row gap-3">
        {photos.map((uri)=>(
            <View key={uri} className="relative">
                <Image source={{ uri }} className="w-20 h-20 rounded-xl"  />
                <Pressable
                onPress={()=> removePhoto(uri)}
                className="absoloute -top-2 -right-2 bg-black/70 rounded-full w-5 h-5 items-center justify-center"
                >
                     <Text className="text-white text-xs">×</Text>
                </Pressable>
            </View>
        ))}


        {photos.length < 5 && (
            <Pressable
            onPress={pickImages}
            className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center"
            >   
            <Plus size={22} color="#9CA3A" />

            </Pressable>
        )}
    </View>
</ScrollView>
</SafeAreaView>




)











}