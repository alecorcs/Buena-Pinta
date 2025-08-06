import { Beer, BeerList } from '@/constants/type';
import { fetchListsByUser, updateList } from '@/db/beerAppDB';
import { useThemeColor } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

type AddToListModalProps = {
    visible: boolean;
    onClose: () => void;
    beer: Beer;
};

export const AddToListModal = ({ visible, onClose, beer }: AddToListModalProps) => {
    const [lists, setLists] = useState<BeerList[]>([]);

    const { isDarkIcon } = useThemeColor();

    useEffect(() => {
        const loadLists = async () => {
            const result = await fetchListsByUser('');
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
            <TouchableOpacity className="flex-1 bg-black/40" onPress={onClose}>
                <View className="mt-auto bg-light-background dark:bg-dark-background rounded-t-2xl px-4 pt-4 pb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-light-text dark:text-dark-text">Añadir a lista</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons className="active:opacity-80" name="close-outline" size={28} color={isDarkIcon} />
                        </TouchableOpacity >
                    </View>

                    <FlatList
                        data={lists}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="py-3 border-b border-gray-200 active:opacity-90"
                                onPress={() => handleAddBeerToList(item)}
                            >
                                <Text className="text-base text-light-text dark:text-dark-text">{item.name}</Text>
                            </TouchableOpacity >
                        )}
                    />
                </View>
            </TouchableOpacity >
        </Modal>
    );
};
