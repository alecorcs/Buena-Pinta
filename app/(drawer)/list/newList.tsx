import Headers from '@/components/presentation/Headers'
import ThemedText from '@/components/presentation/ThemedText'
import ThemedView from '@/components/presentation/ThemedView'
import { BeerList } from '@/constants/type'
import { addList } from '@/db/beerAppDB'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const NewListScreen = () => {

    const router = useRouter();

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
        <SafeAreaView className="flex-1 px-4 py-10">
            <ScrollView showsVerticalScrollIndicator={false}>
                <Headers onPress={() => router.back()} title='Nueva Lista' />
                <ThemedView>
                    <ThemedText className="text-xl font-bold mb-2">Crear Nueva Lista</ThemedText>

                    <ThemedText className="text-sm mt-3">Nombre de la lista</ThemedText>
                    <TextInput
                        className="border p-2 my-2 rounded bg-light-defaultBeerCard dark:bg-dark-defaultBeerCard text-light-text dark:text-dark-text"
                        value={form.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />
                    <TouchableOpacity
                        className="mt-6 bg-light-primary dark:bg-dark-primar active:opacity-80 p-4 rounded items-center"
                        onPress={handleSubmit}
                    >
                        <Text className="text-white font-bold">Guardar Lista</Text>
                    </TouchableOpacity>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NewListScreen