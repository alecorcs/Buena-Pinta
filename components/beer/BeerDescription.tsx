import { Beer } from '@/constants/type'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

interface BeerDescriptionProps {
    beerData: Beer,
}
const BeerDescription = ({ beerData }: BeerDescriptionProps) => {
    return (
        <ScrollView>
            <View className='mx-4 bg-light-background dark:bg-dark-background'>
                <View className='flex-row mb-2 '>
                    <Text className='text-light-text dark:text-dark-text'>{beerData.alcoholContent}</Text>
                    <Text className='text-light-text dark:text-dark-text'> - {beerData.types}</Text>
                    <Text className='text-light-text dark:text-dark-text'> - ⭐{beerData.rating}</Text>
                </View>
                <Text className='font-bold text-2xl mt-2 text-light-text dark:text-dark-text'>Descripción</Text>
                <Text className='font-semibold text-light-text dark:text-dark-text'>{beerData.description}</Text>
            </View>
        </ScrollView>
    )
}

export default BeerDescription