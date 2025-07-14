import { Search } from '@/components/Search';
import { Drawer } from 'expo-router/drawer';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

const List = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { headerRight, headerTitle } = Search(
        {
            iconName: "albums-outline",
            onSearchChange: setSearchQuery,
        }
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Drawer.Screen
                options={{
                    headerRight,
                    headerTitle,
                }}
            />
        </SafeAreaView>
    );
};


export default List;