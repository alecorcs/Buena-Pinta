import LottieView from 'lottie-react-native'
import React from 'react'
import { View } from 'react-native'

const LoadScreen = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <LottieView
                source={require('@/assets/animation/loading-beer.json')}
                loop
                autoPlay
                style={{ width: 200, height: 200 }}
            />
        </View>
    )
}

export default LoadScreen