import { Beer } from '@/types/type';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { AddToListModal } from './AddToList';

type BeerCardProps = {
  beer: Beer;
  onPress?: () => void;
  screen: "listScreen" | "beerScreen"
};

export const BeerCard = ({ beer, onPress, screen }: BeerCardProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <Pressable
        onPress={onPress}
        className={'active:opacity-90 px-1 mb-3'}
      >
        <View className="relative" style={{ width: 130, height: 210 }}>
          <Image
            source={
              beer.imageUrl
                ? { uri: beer.imageUrl }
                : require('@/assets/beer-placeholder.jpg')
            }
            className="w-full h-full shadow-lg rounded-2xl"
            style={{
              width: 130,
              height: 210,
            }}
            resizeMode="cover"
          />

          {/* Menú de opciones */}
          <View className="absolute top-2 right-2 z-10">
            <Pressable
              onPress={() => setShowOptions(!showOptions)}
              className="p-1.5 rounded-full bg-black/50"
            >
              <Ionicons name="ellipsis-vertical" size={14} color="white" />
            </Pressable>
            {showOptions && (
              <View className="absolute right-0 top-8 w-28 bg-white rounded-lg shadow-lg z-20">
                {screen === 'beerScreen' && (
                  <Pressable
                    onPress={() => {
                      setModalVisible(true);
                      setShowOptions(false);
                      console.log('Añadir a lista', beer.name);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 rounded-t-lg"
                  >
                    <Text className="text-xs text-black">Añadir a lista</Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={() => {
                    setShowOptions(false);
                    console.log('Eliminar', beer.name);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 rounded-b-lg"
                >
                  <Text className="text-xs text-red-500">Eliminar</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Información de la cerveza */}
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
      </Pressable>

      <AddToListModal
        visible={modalVisible}
        beer={beer}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};
