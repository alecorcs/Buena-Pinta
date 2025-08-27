
import BeerDescription from '@/components/beer/BeerDescription';
import BeerHeader from '@/components/beer/BeerHeader';
import { Beer } from '@/constants/type';
import { fetchBeer } from '@/db/beerAppDB';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const beerCache: { [id: string]: Beer } = {};
const BeerSelectedScreen = () => {
    const { beerID } = useLocalSearchParams();
    const [beer, setBeer] = useState<Beer | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    const isMountedRef = useRef(false);

    const loadBeer = useCallback(async () => {
        const id = beerID as string;
        if (beerCache[id]) {
            setBeer(beerCache[id]);
            return;
        }

        const result = await fetchBeer(id);
        if (result) {
            beerCache[id] = result;
        }
        setBeer(result);
    }, [beerID]);


    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const waitMinimum = new Promise((resolve) => setTimeout(resolve, 600));
            const beersPromise = loadBeer();
            await Promise.all([waitMinimum, beersPromise]);
            setLoading(false);
        }
        loadData();
    }, [loadBeer]);

    useFocusEffect(
        useCallback(() => {
            if (isMountedRef.current) {
                loadBeer();
            } else {
                isMountedRef.current = true;
            }
        }, [loadBeer])
    );

    if (isLoading || !beer) {
        return (
            <LinearGradient
                colors={['#FFD700', '#FFA500']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className='flex-1 w-full h-full justify-center items-center'
            >
                <ActivityIndicator size={'large'} color={'#fff'} />
            </LinearGradient>

        )
    };

    return (
        <ScrollView>
            <BeerHeader
                poster={beer?.imageUrl ?? ''}
                title={beer?.name ?? 'No Beer Found'}
                originally={beer?.country ?? 'No Country Found'}
            />
            <BeerDescription beerData={beer} />
        </ScrollView>
    )
}

export default BeerSelectedScreen