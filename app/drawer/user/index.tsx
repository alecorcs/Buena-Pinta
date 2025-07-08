import { router } from 'expo-router'
import { getAuth } from 'firebase/auth'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../../../FirebaseConfig'

const index = () => {
getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/');
});

    return (
        <SafeAreaView className='flex-1 bg-white justify-center items-center px-6'>
            <Text className='text-lg font-bold mb-4'>SignOut</Text>
            <TouchableOpacity
                onPress={() => {auth.signOut()}} >
                    <Text className='text-blue-500'>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default index