import ModalDeveloper from '@/components/ModalDeveloper'
import { fetchBeers, fetchLists, fetchUser } from '@/db/beerAppDB'
import { User } from '@/types/type'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, useFocusEffect } from 'expo-router'
import Drawer from 'expo-router/drawer'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const ProfileScreen = () => {
    const [user, setUser] = useState<User | null>(null)

    const [isModalDevelopVisible, setModalDevelopVisible] = useState(false);

    const [totalBeers, setTotalBeers] = useState<number>(0);
    const [totalList, setTotalList] = useState<number>(0);

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
        const beers = await fetchBeers('')
        setTotalBeers(beers.length)
    }, [])

    const loadLists = useCallback(async () => {
        const lists = await fetchLists('')
        setTotalList(lists.length)
    }, [])

    useEffect(() => {
        loadUser();
        loadBeers();
        loadLists();
    }, [loadUser, loadBeers, loadLists])

    useFocusEffect(() => {
        loadUser()
    });

    return (
        <>
            <Drawer.Screen
                options={{
                    headerRight: () =>
                        <View>
                            <Ionicons name="information-circle-outline" size={22} color="black" className='mr-2 active:opacity-40'
                                onPress={() => setModalDevelopVisible(true)} />
                        </View>
                }}
            />
            {/* Image and edit profile */}
            <View className='flex bg-white'>
                <View className='relative w-full h-48'>
                    <Image
                        className='w-full h-full'
                        source={user?.imageBack ?
                            { uri: user.imageBack } :
                            require('@/assets/backImage.jpg')} />
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
                        <Text className='text-lg font-semibold color-slate-500'>Nombre</Text>
                    ) : (
                        <Text className='text-lg font-semibold color-slate-500'>{user?.name}</Text>
                    )}

                    <Text className='text-lg font-semibold color-slate-500'>{user?.email}</Text>
                </View>
            </View>
            {/* Beers and List information */}
            <View className="flex-row w-full h-20 justify-between px-6 mt-2 mb-2">
                <View className="flex-1 bg-white border border-blue-200 rounded-2xl mr-2 shadow-md items-center justify-center">
                    <Text className="text-gray-500 text-sm">Cervezas probadas</Text>
                    <Text className="text-xl font-semibold text-blue-600">{totalBeers}</Text>
                </View>

                <View className="flex-1 bg-white border border-blue-200 rounded-2xl ml-2 shadow-md items-center justify-center">
                    <Text className="text-gray-500 text-sm">Listas</Text>
                    <Text className="text-xl font-semibold text-blue-600">{totalList}</Text>
                </View>
            </View>
            <View className="flex-1 bg-white items-center">
                <TouchableOpacity
                    onPress={() => signOut(auth)}
                    className="bg-blue-600 flex-row items-center justify-center px-4 h-10 rounded-2xl mt-6 shadow-md active:opacity-70"
                >
                    <Text className="text-white text-base font-medium">Cerrar sesión</Text>
                </TouchableOpacity>
            </View>

            {/*Modal information */}
            <ModalDeveloper
                visible={isModalDevelopVisible}
                modalClose={() => setModalDevelopVisible(false)} />
        </>
    )
}

export default ProfileScreen