import { FloatButton } from '@/components/Floatbuttom';
import Lists from '@/components/Lists';
import { Search } from '@/components/Search';
import { fetchLists } from '@/db/beerAppDB';
import { BeerList } from '@/types/type';
import { router, useFocusEffect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView } from 'react-native';

const ListScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [lists, setLists] = useState<BeerList[] | null>(null);
    const [headerVisible, setHeaderVisible] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = e.nativeEvent.contentOffset.y;
        setHeaderVisible(offset < 50);
    };

    const loadLists = useCallback(async () => {
        const result = await fetchLists(searchQuery);
        setLists(result);
    }, [searchQuery]);

    const refreshLists = useCallback(async () => {
        try {
            setIsRefreshing(true);
            await loadLists();
        } catch (error) {
            console.error('Error refreshing beers:', error);
        } finally {
            setIsRefreshing(false);
        }
    }, [loadLists]);

    useEffect(() => {
        loadLists();
    }, [loadLists]);

    useFocusEffect(() => {
        loadLists();
    });

    const { headerRight, headerTitle } = Search(
        {
            iconName: "albums-outline",
            onSearchChange: setSearchQuery,
            headerVisible

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
                data={lists || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Lists
                        list={item}
                    />
                )}
                onScroll={onScroll}
                onRefresh={refreshLists}
                refreshing={isRefreshing}
            />
            <FloatButton onPress={() => {
                router.push('./list/newList');
            }} iconName="add-outline" />
        </SafeAreaView>
    );
};


export default ListScreen;