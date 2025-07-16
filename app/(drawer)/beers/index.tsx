import { BeerCard } from '@/components/BeerCard';
import { FloatButton } from '@/components/Floatbuttom';
import { Search } from '@/components/Search';
import { fetchBeers } from '@/db/beerAppDB';
import { Beer } from '@/types/type';
import { router, useFocusEffect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView } from 'react-native';

const BeersScreen = () => {
    const [beers, setBeers] = useState<Beer[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [headerVisible, setHeaderVisible] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = e.nativeEvent.contentOffset.y;
        setHeaderVisible(offset < 50);
    };


    const loadBeers = useCallback(async () => {
        const result = await fetchBeers(searchQuery);
        setBeers(result);
    }, [searchQuery]);

    const refreshBeers = useCallback(async () => {
        try {
            setIsRefreshing(true);
            await loadBeers();
        } catch (error) {
            console.error('Error refreshing beers:', error);
        } finally {
            setIsRefreshing(false);
        }
    }, [loadBeers]);

    useEffect(() => {
        loadBeers();
    }, [loadBeers]);

    useFocusEffect(() => {
        loadBeers();
    });




    const { headerRight, headerTitle } = Search(
        {
            iconName: "beer-outline",
            onSearchChange: setSearchQuery,
            headerVisible,
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
            <FlatList
                data={beers || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BeerCard
                        beer={item}
                        onPress={() => console.log("Tapped", item.name)}
                        screen="beerScreen"
                    />
                )}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 80, paddingTop: 8 }}
                onScroll={onScroll}
                onRefresh={refreshBeers}
                refreshing={isRefreshing}
            />

            <FloatButton onPress={() => {
                router.push('./beers/newBeers');
            }} iconName="add-outline" />
        </SafeAreaView>
    );
};

export default BeersScreen;
