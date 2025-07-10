import { Search } from '@/components/Search';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { SafeAreaView } from 'react-native';

const index = () => {
    const { headerRight, headerTitle } = Search(
        {
            iconName: "albums-outline",
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


export default index