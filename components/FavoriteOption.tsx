import { Beer, BeerList } from '@/constants/type'
import { deleteBeerFromList, fetchListsByUser, updateList } from '@/db/beerAppDB'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

type Props = {
    beer: Beer;
}

const FavoriteOption = ({beer}: Props) => {
    const [favList, setFavList] = useState<BeerList>()

    const [colorFill, setColorFill] = useState(false)

    const fetchBeerInList = useCallback(async () => {
        const favouriteList = await fetchListsByUser('Favoritas')
        setFavList(favouriteList[0])
        const beersInList = favList?.beers ?? []
        if(beersInList.some((b) => b.id === beer.id)){
            setColorFill(true)
        }
    }, [beer.id, favList])

    useEffect(() => {
        fetchBeerInList();
    }, [fetchBeerInList])



    const handleFavouriteList = async(list: BeerList) =>{
        if(colorFill && favList){
            console.log("Eliminando de Favoritas");
            deleteBeerFromList(favList.id, beer.id);
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
    <View className='absolute bottom-2 right-2 z-10'>
        <TouchableOpacity
            onPress={() => { if (favList) handleFavouriteList(favList) }}
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