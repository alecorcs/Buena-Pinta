import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

export const DefaultBeerCard = () => (
    <View className="w-36 h-44 m-4 justify-center overflow-hidden rounded-xl items-center bg-gray-200 shadow-sm">
        <Ionicons name="beer-outline" size={64} color="#9ca3af" />
        <Text className="mt-2 text-base text-gray-500 font-medium">
            Agrega una cerveza
        </Text>
    </View>
);
