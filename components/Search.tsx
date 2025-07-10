// components/Search.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

type SearchProps = {
    iconName: React.ComponentProps<typeof Ionicons>['name'];
};


export const Search = ({ iconName }: SearchProps) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    return {
        headerTitle: () =>
            searchVisible ? (
                <TextInput
                    placeholder="Buscar cerveza..."
                    value={searchText}
                    onChangeText={(text) => {
                        setSearchText(text);
                    }}
                    style={{
                        backgroundColor: '#f0f0f0',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 8,
                        width: 200,
                    }}
                    autoFocus
                />
            ) : (
                <View>
                    <Ionicons name={iconName} size={20} color="black" />
                </View>
            ),

        headerRight: () => (
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
        ),
    };
};
