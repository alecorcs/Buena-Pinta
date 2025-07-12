import { Beer } from '@/types/type';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

type BeerCardProps = {
  beer: Beer;
  onPress?: () => void;
};

export const BeerCard = ({ beer, onPress }: BeerCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 p-4 border-b border-gray-100 bg-white"
    >
      <Image
        source={
          beer.imageUrl
            ? { uri: beer.imageUrl }
            : require('@/assets/beer-placeholder.jpg')
        }
        className="w-16 h-16 rounded-xl bg-gray-200"
        resizeMode="cover"
      />

      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold">{beer.name}</Text>
        </View>

        <Text className="text-sm text-gray-500">
          {beer.types} • {beer.country}
        </Text>

        <Text className="text-sm text-gray-700">
          🍺 {beer.alcoholContent}%  •  ⭐ {beer.rating}
        </Text>
      </View>
    </Pressable>
  );
};
