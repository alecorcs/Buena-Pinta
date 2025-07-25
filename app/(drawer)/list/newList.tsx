import { addList } from '@/db/beerAppDB'
import { BeerList } from '@/types/type'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import Drawer from 'expo-router/drawer'
import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'

const NewListScreen = () => {

    const router = useRouter();
    const goBack = () => {
        if (router.canGoBack()) {
            router.push('/list');
        }
    };

    const [form, setForm] = useState<Partial<BeerList>>({
        id: '',
        userId: '',
        name: '',
    });

    const handleChange = (field: keyof BeerList, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.name) {
            Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
            return;
        }

        try {
            await addList(form as BeerList);
            Alert.alert('Cerveza añadida', 'Tu cerveza ha sido guardada con éxito');
            router.back();
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar la cerveza.');
            console.error(error);
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <Drawer.Screen
                options={{
                    headerLeft: () => (
                        <TouchableWithoutFeedback onPress={goBack}>
                            <Ionicons className='ml-4 active:opacity-40' name="chevron-back-outline" size={24} color="black" />
                        </TouchableWithoutFeedback>
                    ),
                }}
            />
            <View>
                <Text className="text-xl font-bold mb-2">Crear Nueva Lista</Text>

                <Text className="text-sm mt-3">Nombre de la lista</Text>
                <TextInput
                    className="border p-2 rounded bg-gray-100"
                    value={form.name}
                    onChangeText={(text) => handleChange('name', text)}
                />
                <TouchableWithoutFeedback
                    className="mt-6 bg-black active:opacity-80 p-4 rounded items-center"
                    onPress={handleSubmit}
                >
                    <Text className="text-white font-bold">Guardar Lista</Text>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

export default NewListScreen