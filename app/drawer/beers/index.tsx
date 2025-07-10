import { Search } from '@/components/Search'; // Asegúrate de que la ruta esté bien
import { Drawer } from 'expo-router/drawer';
import { SafeAreaView } from 'react-native';

const Beers = () => {
    const { headerRight, headerTitle } = Search(
        {
            iconName: "beer-outline",
        }
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Drawer.Screen
                options={{
                    headerRight,
                    headerTitle,
                }}
            />
        </SafeAreaView>
    );
};

export default Beers;
