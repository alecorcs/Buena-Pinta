import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import ThemedText from './ThemedText';

type SearchProps = {
    iconName?: React.ComponentProps<typeof Ionicons>['name'];
    onSearchChange: (text: string) => void;
    headerVisible?: boolean;
    title?: string;
};


export const Search = ({ iconName, onSearchChange, headerVisible, title }: SearchProps) => {

    const { isDarkIcon } = useThemeColor();

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
                ) : (iconName ? (
                    <View>
                        <Ionicons name={iconName} size={20} color={isDarkIcon} />
                    </View>
                ) : (
                    <View>
                        <ThemedText className="text-xl font-bold">{title}</ThemedText>
                    </View>
                )
                )
            ) : null,

        headerRight: () =>
            headerVisible ? (
                <Pressable
                    onPress={() => setSearchVisible(!searchVisible)}
                    className='mr-4 active:opacity-80'
                >
                    <Ionicons
                        name={searchVisible ? 'close-outline' : 'search-outline'}
                        size={24}
                        color={isDarkIcon}
                    />
                </Pressable>
            ) : null,
    };
};
