
//import { Beer } from '@/constants/type';
import { useLocalSearchParams } from 'expo-router';
//import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const BeerSelectedScreen = () => {
    //const [beer, setBeers] = useState<Beer | null>(null)
    //useLocalSearchParams is a hook that allows you to access the search params of the current route
    //${item.id} on href={`./beers/${item.id}`}
    const { beersID } = useLocalSearchParams();
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>{beersID}</Text>
                </View >
            </ScrollView>
        </SafeAreaView>
    )
}

export default BeerSelectedScreen