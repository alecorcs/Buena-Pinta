import { Beer, BeerList } from '@/constants/type'
import { deleteBeerFromList, fetchListsByUser, updateList } from '@/db/beerAppDB'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

type Props = {
    beer: Beer;
}

const FavoriteOption = ({ beer }: Props) => {
    const [favList, setFavList] = useState<BeerList>()

    const [colorFill, setColorFill] = useState(false)

    useEffect(() => {
        const fetchBeerInList = async () => {
            const allLists = await fetchListsByUser('');
            const favouriteList = allLists.find((list) => list.name === 'Favoritas');
            if (favouriteList) {
                setFavList(favouriteList);
                const beersInList = favouriteList.beers ?? [];
                setColorFill(beersInList.some((b) => b.id === beer.id));
            }
        };

        fetchBeerInList();
    }, [beer.id]);

    const handleFavouriteList = async () => {
        if (colorFill && favList) {
            console.log("Eliminando de Favoritas");
            await deleteBeerFromList(favList.id, beer.id);
            setColorFill(false);
        } else {
            console.log("Añadiendo a Favoritas");
            const beersInList = favList?.beers ?? []
            const addBeerToList = [...beersInList, beer]
            if (favList) {
                await updateList(favList.id, { beers: addBeerToList });
                setColorFill(true);
            }
        }
    };

    return (
        <View className='absolute top-2 left-2 z-10 rounded-full overflow-hidden'>
            <TouchableOpacity
                onPress={(e) => {
                    e.stopPropagation();
                    handleFavouriteList();
                }}
                disabled={!favList}
                className="p-1.5 active:opacity-80 bg-black/50">
                {colorFill ?
                    <Ionicons name="heart" size={14} color="white" />
                    :
                    <Ionicons name="heart-outline" size={14} color="white" />
                }
            </TouchableOpacity>
        </View>
    )
}

export default FavoriteOption