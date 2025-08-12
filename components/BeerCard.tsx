import { Beer, BeerList } from '@/constants/type';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AddToListModal } from './AddToList';
import CardMenu from './CardMenu';

type BeerCardProps = {
  beer: Beer;
  screen: "listScreen" | "beerScreen"
  list?: BeerList;
};

export const BeerCard = ({ beer, screen, cardWidth, list }: BeerCardProps & { cardWidth: number }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          router.push(`/beers/${beer.id}`)
        }}
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
          {screen === 'beerScreen' ? (
            <CardMenu
              beer={beer}
              screen={screen}
              setShowOptions={setShowOptions}
              showOptions={showOptions}
              setModalVisible={setModalVisible}
            />
          ) : (
            <CardMenu
              beer={beer}
              screen={screen}
              setShowOptions={setShowOptions}
              showOptions={showOptions}
              setModalVisible={setModalVisible}
              list={list}
            />
          )}

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
