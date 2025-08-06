import { useThemeColor } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import ThemedText from "./presentation/ThemedText";

export const DefaultBeerCard = () => {
    const { isDarkText } = useThemeColor();
    return (
        <View className="h-44 m-4 justify-center overflow-hidden rounded-xl items-center bg-light-defaultBeerCard dark:bg-dark-defaultBeerCard shadow-sm">
            <Ionicons name="beer-outline" size={64} color={isDarkText} />
            <ThemedText className="mt-2 text-base px-2 font-medium">
                Agrega una cerveza
            </ThemedText>
        </View>
    );
};
