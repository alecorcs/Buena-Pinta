import { FloatButton } from '@/components/Floatbuttom';
import { Search } from '@/components/Search';
import ShowBeersScreen from '@/components/ShowBeers';
import { fetchBeers } from '@/db/beerAppDB';
import { Beer } from '@/types/type';
import { router, useFocusEffect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, SafeAreaView } from 'react-native';

const BeersScreen = () => {
    const [beers, setBeers] = useState<Beer[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [headerVisible, setHeaderVisible] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

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
            <ShowBeersScreen showList={beers} isRefreshing={isRefreshing} onScroll={onScroll} refresh={refreshBeers} />

            <FloatButton onPress={() => {
                router.push('./beers/newBeers');
            }} iconName="add-outline" />
        </SafeAreaView>
    );
};

export default BeersScreen;
