import { Beer } from '@/types/type'
import React from 'react'
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { BeerCard } from './BeerCard'

type showBeerProps = {
    showList: Beer[] | null,
    isRefreshing: boolean,
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
    refresh: () => Promise<void>,
}


const ShowBeersScreen = ({ showList, isRefreshing, onScroll, refresh }: showBeerProps) => {
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
                    />
                )}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 80, paddingTop: 8 }}
                onScroll={onScroll}
                onRefresh={refresh}
                refreshing={isRefreshing}
            />
        </>
    )
}

export default ShowBeersScreen