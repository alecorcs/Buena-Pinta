import { FloatButton } from '@/components/Floatbuttom';
import { Search } from '@/components/Search';
import ShowBeersScreen from '@/components/ShowBeers';
import { Beer } from '@/constants/type';
import { fetchBeersByUser } from '@/db/beerAppDB';
import { router, useFocusEffect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, View } from 'react-native';

import LottieView from 'lottie-react-native';

const BeersScreen = () => {
    const [beers, setBeers] = useState<Beer[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [headerVisible, setHeaderVisible] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false)

    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = e.nativeEvent.contentOffset.y;
        setHeaderVisible(offset < 50);
    };

    const isMountedRef = useRef(false);

    const loadBeers = useCallback(async () => {
        const result = await fetchBeersByUser(searchQuery);
        setBeers(result);
    }, [searchQuery]);

    const refreshBeers = useCallback(async () => {
        setIsRefreshing(true);
        await loadBeers();
        setIsRefreshing(false);

    }, [loadBeers]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const waitMinimum = new Promise((resolve) => setTimeout(resolve, 2000));
            const beersPromise = loadBeers();
            await Promise.all([waitMinimum, beersPromise]);
            setLoading(false);
        }
        loadData();
    }, [loadBeers]);

    useFocusEffect(
        useCallback(() => {
            if (isMountedRef.current) {
                loadBeers();
            } else {
                isMountedRef.current = true;
            }
        }, [loadBeers])
    );




    const { headerRight, headerTitle } = Search(
        {
            iconName: "beer-outline",
            onSearchChange: setSearchQuery,
            headerVisible,
        }
    );

    return (
        <>
            <Drawer.Screen
                options={{
                    headerRight,
                    headerTitle,
                }}
            />
            <SafeAreaView className="flex-1">
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
                        <ShowBeersScreen showList={beers} isRefreshing={isRefreshing} onScroll={onScroll} refresh={refreshBeers} />

                        <FloatButton onPress={() => {
                            router.push('./beers/newBeers');
                        }} iconName="add-outline" />
                    </>
                )}

            </SafeAreaView>

        </>
    );
};

export default BeersScreen;
