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
        <SafeAreaView className='flex bg-white px-6 items-center justify-center'>
            <TouchableOpacity
                onPress={() => { auth.signOut() }} >
                <Text className='text-blue-500'>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default index