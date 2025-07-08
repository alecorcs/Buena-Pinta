import CustomDrawer from '@/components/CustomDrawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
    return (
        <Drawer
            drawerContent={CustomDrawer}
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                sceneStyle: {
                    backgroundColor: 'white',
                },
                drawerActiveTintColor: 'indigo',
                drawerInactiveTintColor: '#000',
                drawerStyle: {
                    width: 255,
                },
            }}>
            <Drawer.Screen
                name="beers/index"
                options={{
                    drawerLabel: 'Beers',
                    title: 'Beers',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="beer-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="list/index"
                options={{
                    drawerLabel: 'List',
                    title: 'List',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="albums-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="user/index"
                options={{
                    drawerLabel: 'Schedule',
                    title: 'Schedule',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-circle-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Drawer>
    )
}

export default DrawerLayout