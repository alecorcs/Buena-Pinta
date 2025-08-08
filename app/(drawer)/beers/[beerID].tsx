
import BeerDescription from '@/components/beer/BeerDescription';
import BeerHeader from '@/components/beer/BeerHeader';
import LoadScreen from '@/components/presentation/LoadScreen';
import { Beer } from '@/constants/type';
import { fetchBeer } from '@/db/beerAppDB';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
            const waitMinimum = new Promise((resolve) => setTimeout(resolve, 2000));
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
            <LoadScreen />
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