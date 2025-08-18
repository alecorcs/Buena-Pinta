import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, Image } from 'react-native'

const SplashScreen = () => {
    return (
        <LinearGradient
            colors={['#FFD700', '#FFA500']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className='flex-1 w-full h-full justify-center items-center'
        >
            <Image
                source={require('@/assets/images/login-image.png')}
                style={{ width: 220, height: 220, marginBottom: 30 }}
                resizeMode="contain"
            />
            <ActivityIndicator size="large" color="#fff" />
        </LinearGradient>
    )
}

export default SplashScreen