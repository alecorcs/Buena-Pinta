import { Beer, BeerList } from '@/constants/type';
import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView, useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { BeerCard } from './BeerCard';
import { DefaultBeerCard } from './DefaultBeerCard';

type listProps = {
    list: BeerList;
    onPress?: () => void;
}
const Lists = ({ list }: listProps) => {
    const { width } = useWindowDimensions()

    const getNumColumns = () => {
        if (width < 400) return 2;
        if (width < 768) return 3;
        return 4;
    };

    return (
        <SafeAreaView>
            <View className='mt-2'>
                {list && (
                    <Link href={`/(drawer)/list/${list.id}`} className='text-light-text dark:text-dark-text text-3xl font-bold px-4 mb-2'>
                        {list.name}
                    </Link>
                )}
            </View>
            {list.beers && list.beers.length > 0 ? (
                <View className='w-full h-60'>
                    <Carousel
                        data={list.beers}
                        renderItem={
                            ({ item }: { item: Beer }) => (
                                <BeerCard
                                    key={item.id}
                                    beer={item}
                                    list={list}
                                    screen="listScreen"
                                    cardWidth={(width - 32) / getNumColumns() - 8}
                                />)}
                        width={200}
                        height={350}
                        mode='parallax'
                        loop={false}
                        modeConfig={{
                            parallaxScrollingScale: 0.9,
                            parallaxScrollingOffset: 70
                        }}
                        style={{
                            width: width,
                            height: 350,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </View>
            ) : (
                <DefaultBeerCard />
            )}
        </SafeAreaView >
    )
}

export default React.memo(Lists);