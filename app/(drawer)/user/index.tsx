import ModalDeveloper from '@/components/ModalDeveloper'
import { User } from '@/constants/type'
import { fetchBeersByUser, fetchListsByUser, fetchUser } from '@/db/beerAppDB'
import { useThemeColor } from '@/hooks/useColorScheme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, useFocusEffect } from 'expo-router'
import Drawer from 'expo-router/drawer'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import LottieView from 'lottie-react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
const ProfileScreen = () => {
    const [user, setUser] = useState<User | null>(null)

    const [isModalDevelopVisible, setModalDevelopVisible] = useState(false);

    const [totalBeers, setTotalBeers] = useState<number>(0);
    const [totalList, setTotalList] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(false)

    const { isDarkIcon, isDarkView } = useThemeColor();

    const auth = getAuth();
    const userLog = auth.currentUser

    onAuthStateChanged(auth, (user) => {
        if (!user) router.replace('/');
    });

    const loadUser = useCallback(async () => {
        if (userLog) {
            const result = await fetchUser(userLog.uid);
            setUser(result);
        }
    }, [userLog]);

    const loadBeers = useCallback(async () => {
        const beers = await fetchBeersByUser('')
        setTotalBeers(beers.length)
    }, [])

    const loadLists = useCallback(async () => {
        const lists = await fetchListsByUser('')
        setTotalList(lists.length)
    }, [])

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            const waitMinimum = new Promise((resolve) => setTimeout(resolve, 2000));
            const userPromise = loadUser();
            const beersPromise = loadBeers();
            const listsPromise = loadLists();

            await Promise.all([waitMinimum, userPromise, beersPromise, listsPromise]);

            setLoading(false);
        };

        loadData();
    }, [loadUser, loadBeers, loadLists]);

    useFocusEffect(() => {
        loadUser()
    });

    return (
        <>
            <Drawer.Screen
                options={{
                    headerRight: () => (
                        <View>
                            <Ionicons name="information-circle-outline" size={22} color={isDarkIcon} className='mr-2 active:opacity-40'
                                onPress={() => setModalDevelopVisible(true)} />
                        </View>
                    ),
                    headerStyle: {
                        backgroundColor: isDarkView
                    },
                }}
            />
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <LottieView
                        source={require('@/assets/animation/loading-beer.json')}
                        loop
                        autoPlay
                        style={{ width: 200, height: 200 }}
                    />
                </View>
            ) : (
                <>
                    <View className='flex-1'>
                        <View className='relative w-full h-48'>
                            <Image
                                className='w-full h-full'
                                source={user?.imageBack ?
                                    { uri: user.imageBack } :
                                    require('@/assets/images/backImage.jpg')} />
                            <View className='absolute size-24 left-8 top-28 bg-blue-600 items-center justify-center rounded-full'>
                                {user?.photoURL ? (
                                    <Image
                                        source={{ uri: user.photoURL }}
                                        className="w-full h-full rounded-full"
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Ionicons name="person" size={40} color="white" />
                                )}
                                <TouchableOpacity
                                    onPress={() => router.push('./user/editProfile')}
                                    className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow"
                                >
                                    <Ionicons name="pencil" size={16} color="#1e40af" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className='relative w-full mt-4 items-center'>
                            {user?.name === undefined ? (
                                <Text className='text-lg font-semibold text-light-text dark:text-dark-text'>Nombre</Text>
                            ) : (
                                <Text className='text-lg font-semibold text-light-text dark:text-dark-text'>{user?.name}</Text>
                            )}

                            <Text className='text-lg font-semibold text-light-text dark:text-dark-text'>{user?.email}</Text>
                        </View>

                        < View className="flex-row w-full h-20 justify-between px-6 mt-2 mb-2" >
                            <View className="flex-1 bg-light-defaultBeerCard dark:bg-dark-defaultBeerCard border border-blue-200 rounded-2xl mr-2 shadow-md items-center justify-center">
                                <Text className="text-light-text dark:text-dark-text text-sm">Cervezas probadas</Text>
                                <Text className="text-xl font-semibold text-light-primary dark:text-dark-primary">{totalBeers}</Text>
                            </View>

                            <View className="flex-1 bg-light-defaultBeerCard dark:bg-dark-defaultBeerCard border border-blue-200 rounded-2xl ml-2 shadow-md items-center justify-center">
                                <Text className="text-light-text dark:text-dark-text text-sm">Listas</Text>
                                <Text className="text-xl font-semibold text-light-primary dark:text-dark-primary">{totalList}</Text>
                            </View>
                        </View >
                        <View className="flex-1 bg-light-background dark:bg-dark-background items-center">
                            <TouchableOpacity
                                onPress={() => signOut(auth)}
                                className="bg-light-primary dark:bg-dark-primary flex-row items-center justify-center px-4 h-10 rounded-2xl mt-6 shadow-md active:opacity-70"
                            >
                                <Text className="text-light-text dark:text-dark-text text-base font-medium">Cerrar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View >


                    <ModalDeveloper
                        visible={isModalDevelopVisible}
                        modalClose={() => setModalDevelopVisible(false)} />
                </>
            )}
        </>
    )
}

export default ProfileScreen