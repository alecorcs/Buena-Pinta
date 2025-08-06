import CustomDrawer from '@/components/CustomDrawer';
import { useThemeColor } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Drawer } from 'expo-router/drawer';
const DrawerLayout = () => {


    const { isDarkView, isDarkText, isDarkActiveDrawer } = useThemeColor();

    return (
        <Drawer
            drawerContent={CustomDrawer}
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                sceneStyle: {
                    backgroundColor: isDarkView
                },
                drawerActiveTintColor: isDarkActiveDrawer,
                drawerInactiveTintColor: isDarkText,
                drawerStyle: {
                    width: 255,
                    backgroundColor: isDarkView,
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
                    drawerLabel: 'Profile',
                    title: 'Profile',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-circle-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="beers/newBeers"
                options={{
                    headerShown: false,
                    drawerLabel: () => null,
                    title: 'Nueva Cerveza',
                    drawerItemStyle: { height: 0 }
                }}
            />
            <Drawer.Screen
                name="list/newList"
                options={{
                    headerShown: false,
                    drawerLabel: () => null,
                    title: 'Nueva Lista',
                    drawerItemStyle: { height: 0 }
                }}
            />
            <Drawer.Screen
                name="list/[listID]"
                options={{
                    drawerLabel: () => null,
                    drawerItemStyle: { height: 0 }
                }}
            />
            <Drawer.Screen
                name="user/editProfile"
                options={{
                    headerShown: false,
                    drawerLabel: () => null,
                    title: 'Editar Perfil',
                    drawerItemStyle: { height: 0 }
                }}
            />
            <Drawer.Screen
                name="beers/[beerID]"
                options={{
                    drawerLabel: () => null,
                    drawerItemStyle: { height: 0 },
                    headerShown: false,
                }}
            />
        </Drawer>
    )
}

export default DrawerLayout