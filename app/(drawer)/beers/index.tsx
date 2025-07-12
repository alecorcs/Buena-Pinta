import { BeerCard } from '@/components/BeerCard';
import { FloatButton } from '@/components/Floatbuttom';
import { Search } from '@/components/Search';
import { fetchBeers } from '@/db/beerAppDB';
import { Beer } from '@/types/type';
import { router, useFocusEffect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

const Beers = () => {
    const [beers, setBeers] = useState <Beer[] | null> (null);
    const [searchQuery, setSearchQuery] = useState<string>('');

  
  const loadBeers = useCallback(async () => {
        const result = await fetchBeers(searchQuery);
        setBeers(result);
    }, [searchQuery]);

    useEffect(() => {
        loadBeers();
    }, [loadBeers]);

    useFocusEffect(() => {
       loadBeers();
    });
    



    const { headerRight, headerTitle } = Search(
        {
            iconName: "beer-outline",
            onSearchChange: setSearchQuery,
        }
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Drawer.Screen
                options={{
                    headerRight,
                    headerTitle,
                }}
            />
            <FlatList
                data={beers || []}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BeerCard
                        beer={item}
                        onPress={() => console.log("Tapped", item.name)}
                    />
                )}
            />

            <FloatButton onPress={() => {
                router.push('./beers/newBeers');
            }} iconName="add-outline" />
        </SafeAreaView>
    );
};

export default Beers;
