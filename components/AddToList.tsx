import { fetchLists, updateList } from '@/db/beerAppDB';
import { Beer, BeerList } from '@/types/type';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';

type AddToListModalProps = {
    visible: boolean;
    onClose: () => void;
    beer: Beer;
};

export const AddToListModal = ({ visible, onClose, beer }: AddToListModalProps) => {
    const [lists, setLists] = useState<BeerList[]>([]);

    useEffect(() => {
        const loadLists = async () => {
            const result = await fetchLists('');
            setLists(result || []);
        };

        if (visible) {
            loadLists();
        }
    }, [visible]);

    const handleAddBeerToList = async (list: BeerList) => {
        const beersInList = list.beers ?? []
        const alreadyExists = list.beers?.some((b) => b.id === beer.id);
        if (alreadyExists) {
            onClose();
            return;
        }
        const addBeerToList = [...beersInList, beer]
        await updateList(list.id, { beers: addBeerToList });
        onClose();


    }

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable className="flex-1 bg-black/40" onPress={onClose}>
                <View className="mt-auto bg-white rounded-t-2xl px-4 pt-4 pb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-gray-800">Añadir a lista</Text>
                        <Pressable onPress={onClose}>
                            <Ionicons name="close-outline" size={28} color="gray" />
                        </Pressable>
                    </View>

                    <FlatList
                        data={lists}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <Pressable
                                className="py-3 border-b border-gray-200"
                                onPress={() => handleAddBeerToList(item)}
                            >
                                <Text className="text-base text-gray-700">{item.name}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            </Pressable>
        </Modal>
    );
};
