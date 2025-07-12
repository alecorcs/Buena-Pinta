import { fetchUser } from '@/db/beerAppDB'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer'
import React from 'react'
import { Image, View } from 'react-native'
import { auth } from '../FirebaseConfig'

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const [userImage, setUserImage] = React.useState<string | null>(null);

    React.useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            fetchUser(user.uid)
                .then((userData) => {
                    if (userData && userData.photoURL) {
                        setUserImage(userData.photoURL);
                    }
                });
        }
    }, []);
    return (
        <DrawerContentScrollView
            scrollEnabled={false}
            {...props}>
            <View
                className='flex justify-center items-center mx-2 p-10 mb-10 bg-primary h-[150px] rounded-xl'>
                <View className='flex justify-center items-center bg-blue-600 h-40 w-40 rounded-full'>
                    {userImage ? (
                        <Image
                            source={{ uri: userImage }}
                            className="w-full h-full rounded-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons name="person" size={40} color="white" />
                    )}
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawer