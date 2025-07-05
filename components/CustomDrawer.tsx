import {
    DrawerContentComponentProps,
    DrawerContentScrollView
} from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'

const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView
            scrollEnabled={false}
            {...props}>
            <View
                className='flex justify-center items-center mx-2 p-10 mb-10 bg-primary h-[150px] rounded-xl'>
                <View className='flex justify-center items-center bg-white h-24 w-24 rounded-full'>
                    <Text className='text-primary font-work-black text-3xl'>A</Text>
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer