import { Search } from '@/components/presentation/Search';
import ShowBeersScreen from '@/components/ShowBeers';
import { Beer, BeerList } from '@/constants/type';
import { fetchList } from '@/db/beerAppDB';
import { useThemeColor } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';

const ListSelectedScreen = () => {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [list, setList] = useState<BeerList | null>(null)
    const [beers, setBeers] = useState<Beer[] | null>(null);
    const [headerVisible, setHeaderVisible] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false)

    const router = useRouter();
    //useLocalSearchParams is a hook that allows you to access the search params of the current route
    //${item.id} on href={`./list/${item.id}`}
    const { listID } = useLocalSearchParams();

    const { isDarkView, isDarkIcon } = useThemeColor();

    const isMountedRef = useRef(false);
    const loadList = useCallback(async () => {
        if (!listID || typeof listID !== 'string') return;

        const result = await fetchList(listID);
        if (!result) {
            console.warn('List not found for id:', listID);
            return;
        }

        setList(result);
        setBeers(result.beers ?? null);
    }, [listID]);

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = e.nativeEvent.contentOffset.y;
        setHeaderVisible(offset < 50);
    };

    const refreshList = useCallback(async () => {
        try {
            setIsRefreshing(true);
            await loadList();
        } catch (error) {
            console.error('Error refreshing list:', error);
        } finally {
            setIsRefreshing(false);
        }
    }, [loadList]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const waitMinimum = new Promise((resolve) => setTimeout(resolve, 2000));
            const listPromise = loadList();
            await Promise.all([waitMinimum, listPromise]);
            setLoading(false);
        }
        loadData();
    }, [loadList]);

    useFocusEffect(
        useCallback(() => {
            if (isMountedRef.current) {
                loadList();
            } else {
                isMountedRef.current = true;
            }
        }, [loadList])
    );

    useEffect(() => {
        if (!searchQuery) {
            setBeers(list?.beers ?? null);
        } else {
            const filtered = list?.beers?.filter(beer =>
                beer.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) ?? null;
            setBeers(filtered);
        }
    }, [searchQuery, list]);


    const { headerRight, headerTitle } = Search(
        {
            title: list?.name,
            onSearchChange: setSearchQuery,
            headerVisible,
        }
    );

    return (
        <SafeAreaView className="flex-1">
            <Drawer.Screen
                options={{
                    headerLeft: () => (
                        <TouchableWithoutFeedback onPress={() => router.navigate('/(drawer)/list')}>
                            <Ionicons className='ml-4 active:opacity-40' name="chevron-back-outline" size={24} color={isDarkIcon} />
                        </TouchableWithoutFeedback>
                    ),
                    headerRight,
                    headerTitle,
                    headerStyle: {
                        backgroundColor: isDarkView
                    },

                }} />
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <LottieView
                        source={require('@/assets/animation/loading-beer.json')}
                        loop
                        autoPlay
                        style={{ width: 200, height: 200 }}
                    />
                </View>
            ) : (
                <>
                    <ShowBeersScreen showList={beers} isRefreshing={isRefreshing} onScroll={onScroll} refresh={refreshList} />
                </>
            )}

        </SafeAreaView>
    )
}

export default ListSelectedScreen