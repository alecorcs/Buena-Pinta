import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import ThemedText from './ThemedText';

interface Props {
    onPress: () => void;
    title: string

}

const Headers = ({onPress, title}: Props) => {
    const { isDarkIcon } = useThemeColor();
  return (
     <View className="flex-row items-center justify-between mb-4 h-12">
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="chevron-back-outline" size={28} color={isDarkIcon} />
          </TouchableOpacity>

          <View className="absolute left-0 right-0 items-center">
            <ThemedText className="text-xl font-bold">{title}</ThemedText>
          </View>
          <View style={{ width: 28 }} />
        </View>
  )
}

export default Headers