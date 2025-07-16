import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

type SearchProps = {
    iconName: React.ComponentProps<typeof Ionicons>['name'];
    onSearchChange: (text: string) => void;
    headerVisible?: boolean;
};


export const Search = ({ iconName, onSearchChange, headerVisible }: SearchProps) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (text: string) => {
        setSearchText(text);
        onSearchChange(text);
    };

    return {
        headerTitle: () =>
            headerVisible ? (
                searchVisible ? (
                    <TextInput
                        placeholder="Buscar cerveza..."
                        value={searchText}
                        onChangeText={handleSearchChange}
                        className="bg-gray-200 rounded-[10px] px-4 py-2 w-64"
                        autoFocus
                    />
                ) : (
                    <View>
                        <Ionicons name={iconName} size={20} color="black" />
                    </View>
                )
            ) : null,

        headerRight: () =>
            headerVisible ? (
                <Pressable
                    style={{ marginRight: 16 }}
                    onPress={() => setSearchVisible(!searchVisible)}
                >
                    <Ionicons
                        name={searchVisible ? 'close-outline' : 'search-outline'}
                        size={24}
                        color="black"
                    />
                </Pressable>
            ) : null,
    };
};
