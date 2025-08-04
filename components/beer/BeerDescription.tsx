import { Beer } from '@/constants/type'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

interface BeerDescriptionProps {
    beerData: Beer,
}
const BeerDescription = ({ beerData }: BeerDescriptionProps) => {
    return (
        <ScrollView>
            <View className='mx-4'>
                <View className='flex-row mb-2'>
                    <Text>{beerData.alcoholContent}</Text>
                    <Text> - {beerData.types}</Text>
                    <Text> - ⭐{beerData.rating}</Text>
                </View>
                <Text className='font-bold text-2xl mt-2'>Descripción</Text>
                <Text className='font-semibold'>{beerData.description}</Text>
            </View>
        </ScrollView>
    )
}

export default BeerDescription