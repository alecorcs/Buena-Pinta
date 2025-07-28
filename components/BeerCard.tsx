import { Beer } from '@/constants/type';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AddToListModal } from './AddToList';

type BeerCardProps = {
  beer: Beer;
  onPress?: () => void;
  screen: "listScreen" | "beerScreen"
};

export const BeerCard = ({ beer, onPress, screen, cardWidth }: BeerCardProps & { cardWidth: number }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className={'active:opacity-90 px-1 mb-3 ml-4 '}
        style={{ width: cardWidth }}
      >
        <View className="relative" style={{ width: cardWidth, height: 210 }}>
          {/*beers image */}
          <Image
            source={
              beer.imageUrl
                ? { uri: beer.imageUrl }
                : require('@/assets/images/beer-placeholder.jpg')
            }
            className="w-full h-full shadow-lg rounded-2xl"
            style={{
              width: cardWidth,
              height: 210,
            }}
            resizeMode="cover"
          />

          {/*options menu */}
          <View className="absolute top-2 right-2 z-10">
            <TouchableOpacity
              onPress={() => setShowOptions(!showOptions)}
              className="p-1.5 rounded-full active:opacity-80 bg-black/50"
            >
              <Ionicons name="ellipsis-vertical" size={14} color="white" />
            </TouchableOpacity>
            {showOptions && (
              <View className="absolute right-0 top-8 w-28 bg-white rounded-lg shadow-lg z-20">
                {screen === 'beerScreen' && (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setShowOptions(false);
                      console.log('Añadir a lista', beer.name);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 active:opacity-80 rounded-t-lg"
                  >
                    <Text className="text-xs text-black">Añadir a lista</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setShowOptions(false);
                    console.log('Eliminar', beer.name);
                  }}
                  className="px-3 py-2 hover:bg-gray-100  active:opacity-80 rounded-b-lg"
                >
                  <Text className="text-xs text-red-500">Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Beers information */}
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t bg-black/50 to-transparent px-2 py-2 rounded-b-2xl">
            <Text
              className="text-xs font-bold text-white text-center mb-0.5"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {beer.name}
            </Text>

            <Text
              className="text-[10px] text-gray-200 text-center mb-0.5"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {beer.types} • {beer.country}
            </Text>

            <Text className="text-[10px] text-gray-100 text-center">
              🍺 {beer.alcoholContent}% • ⭐ {beer.rating}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* Show modal to add list */}
      <AddToListModal
        visible={modalVisible}
        beer={beer}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};
