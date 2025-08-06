import { useThemeColor } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native';

interface BeerHeaderProps {
    poster: string;
    title: string;
    originally: string;
}

const BeerHeader = ({ poster, title, originally }: BeerHeaderProps) => {
    const { height } = useWindowDimensions()

    const { isDarkIcon } = useThemeColor();
    return (
        <>
            <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'transparent']}
                start={[0, 0]}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: height * 0.4,
                }} />
            <View
                style={{
                    position: 'absolute',
                    zIndex: 99,
                    elevation: 9,
                    top: 35,
                    left: 10,
                }}>
                <Pressable
                    onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={30} color={isDarkIcon} className='shadow' />
                </Pressable>
            </View>
            <View style={{ height: height * 0.7 }}
                className='shadow-xl shadow-black'>
                <View className='flex-1 rounded-b-[25px] overflow-hidden'>
                    <Image
                        source={{ uri: poster }}
                        resizeMode='cover'
                        className='flex-1'
                    />
                </View>
                <View className='px-4 mt-2 bg-light-background dark:bg-dark-background'>
                    <Text className='font-bold text-2xl text-light-text dark:text-dark-text'>{title}</Text>
                    <Text className='text-lg text-light-text dark:text-dark-text mt-2'>{originally}</Text>
                </View>
            </View>
        </>
    )
}

export default BeerHeader