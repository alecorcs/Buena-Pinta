
import { Beer, BeerList } from '@/constants/type';
import { alertDeleteBeer } from '@/utils/alertDeleteBeer';
import { alertRemoveFromList } from '@/utils/alertRemoveFromList';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


type CardMenuProps = {
    beer: Beer;
    list?: BeerList;
    screen: "listScreen" | "beerScreen";
    setShowOptions: (show: boolean) => void;
    showOptions: boolean;
    setModalVisible: (visible: boolean) => void;
};
const CardMenu = ({ beer, screen, setShowOptions, showOptions, setModalVisible, list }: CardMenuProps) => {
    return (
        <View className="absolute top-2 right-2 z-10">
            <TouchableOpacity
                onPress={() => setShowOptions(!showOptions)}
                className="p-1.5 rounded-full active:opacity-80 bg-black/50"
            >
                <Ionicons name="ellipsis-vertical" size={14} color="white" />
            </TouchableOpacity>
            {showOptions && (
                <View className="absolute right-0 top-8 w-28 bg-white rounded-lg shadow-lg z-20">
                    {screen === 'beerScreen' ? (
                        <>
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

                            <TouchableOpacity
                                onPress={() => {
                                    setShowOptions(false);
                                    alertDeleteBeer({
                                        name: beer.name,
                                        id: beer.id,
                                    });
                                }}
                                className="px-3 py-2 hover:bg-gray-100  active:opacity-80 rounded-b-lg"
                            >
                                <Text className="text-xs text-red-500">Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    ) : list && (
                        <TouchableOpacity
                            onPress={() => {
                                setShowOptions(false);
                                alertRemoveFromList({
                                    beerName: beer.name,
                                    listName: list?.name,
                                    listId: list?.id,
                                    beerId: beer.id,

                                });
                            }}
                            className="px-3 py-2 hover:bg-gray-100  active:opacity-80 rounded-b-lg"
                        >
                            <Text className="text-xs text-red-500">Sacar de la lista</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    )
}

export default CardMenu