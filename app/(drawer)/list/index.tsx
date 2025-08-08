import { FloatButton } from '@/components/Floatbuttom';
import Lists from '@/components/Lists';
import LoadScreen from '@/components/presentation/LoadScreen';
import { Search } from '@/components/presentation/Search';
import { BeerList } from '@/constants/type';
import { fetchListsByUser } from '@/db/beerAppDB';
import { useThemeColor } from '@/hooks/useColorScheme';
import { router, useFocusEffect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView } from 'react-native';

const ListScreen = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [lists, setLists] = useState<BeerList[] | null>(null);
    const [headerVisible, setHeaderVisible] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setLoading] = useState<boolean>(false)

    const { isDarkView } = useThemeColor();

    const isMountedRef = useRef(false);

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = e.nativeEvent.contentOffset.y;
        setHeaderVisible(offset < 50);
    };

    const loadLists = useCallback(async () => {
        const result = await fetchListsByUser(searchQuery);
        setLists(result);
    }, [searchQuery]);

    const refreshLists = useCallback(async () => {
        setIsRefreshing(true);
        await loadLists();
        setIsRefreshing(false);
    }, [loadLists]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const waitMinimum = new Promise((resolve) => setTimeout(resolve, 2000));
            const listsPromise = loadLists();
            await Promise.all([waitMinimum, listsPromise]);
            setLoading(false);
        }
        loadData();
    }, [loadLists]);

    useFocusEffect(
        useCallback(() => {
            if (isMountedRef.current) {
                loadLists();
            } else {
                isMountedRef.current = true;
            }
        }, [loadLists])
    );

    const { headerRight, headerTitle } = Search(
        {
            iconName: "albums-outline",
            onSearchChange: setSearchQuery,
            headerVisible

        }
    );

    return (
        <SafeAreaView className="flex-1">
            <Drawer.Screen
                options={{
                    headerRight,
                    headerTitle,
                    headerStyle: {
                        backgroundColor: isDarkView
                    },
                }}
            />
            {isLoading ? (
                <LoadScreen />
            ) : (
                <>
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
                </>
            )}

        </SafeAreaView>
    );
};


export default ListScreen;