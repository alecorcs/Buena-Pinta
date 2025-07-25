import { Beer } from '@/types/type'
import React from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions } from 'react-native'
import { BeerCard } from './BeerCard'

type showBeerProps = {
    showList: Beer[] | null,
    isRefreshing: boolean,
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
    refresh: () => Promise<void>,
}


const ShowBeersScreen = ({ showList, isRefreshing, onScroll, refresh }: showBeerProps) => {
    const { width } = useWindowDimensions();

    const getNumColumns = () => {
        if (width < 400) return 2;
        if (width < 768) return 3;
        return 4;
    };
    return (
        <>
            <FlatList
                data={showList || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BeerCard
                        beer={item}
                        onPress={() => console.log("Tapped", item.name)}
                        screen="beerScreen"
                        cardWidth={(width - 32) / getNumColumns() - 8}
                    />
                )}
                numColumns={getNumColumns()}
                contentContainerStyle={{ paddingBottom: 80, paddingTop: 8 }}
                onScroll={onScroll}
                onRefresh={refresh}
                refreshing={isRefreshing}
            />
        </>
    )
}

export default ShowBeersScreen