import Headers from '@/components/presentation/Headers';
import ThemedText from '@/components/presentation/ThemedText';
import { fetchUser, updateUser } from '@/db/beerAppDB';
import { launchImageFlow } from '@/utils/alertPickImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const EditProfileScreen = () => {
    const [name, setName] = useState<string>('');
    const [photoURL, setPhotoURL] = useState<string>('');
    const [imageBack, setImageBack] = useState<string>('');

    const auth = getAuth();
    const user = auth.currentUser;
    const router = useRouter();


    useEffect(() => {
        if (user) {
            fetchUser(user.uid).then((data) => {
                setName(data?.name ?? '');
                setPhotoURL(data?.photoURL ?? '');
                setImageBack(data?.imageBack ?? '')
            });
        }
    }, [user]);

    const handleSave = async () => {
        try {
            if (user) {
                const updates: any = {};
                if (name) updates.name = name;
                if (photoURL) updates.photoURL = photoURL;
                if (imageBack) updates.imageBack = imageBack;

                await updateUser(user.uid, updates);
                Alert.alert('Perfil actualizado');
            }
        } catch (error) {
            Alert.alert('Error al guardar cambios');
            console.error('Error al guardar cambios', error)
        }
    };

    const pickImageHandler = () => {
        launchImageFlow((url, useFor) => {
            if (useFor === 'profile') setPhotoURL(url);
            else if (useFor === 'cover') setImageBack(url);
        });
    };

    return (
        <ScrollView className="flex-1 p-4 bg-light-background dark:bg-dark-background py-10">
            <Headers onPress={() => router.back()} title='Editar Perfil' />
            <ThemedText className="mb-2 font-semibold">Nombre</ThemedText>
            <TextInput
                className="border p-2 rounded mb-4 bg-light-defaultBeerCard dark:bg-dark-defaultBeerCard text-light-text dark:text-dark-text"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity
                className="mt-6 p-4 bg-light-primary dark:bg-dark-primary active:opacity-40 rounded items-center mb-5"
                onPress={pickImageHandler}
            >
                <Ionicons name="image-outline" size={24} color='white' />
                <Text className='text-white'>Imagen de perfil</Text>
            </TouchableOpacity>
            <View className="mt-4 space-y-4">
                {/* Portada */}
                {imageBack ? (
                    <Image
                        source={{ uri: imageBack }}
                        className="w-full h-48 rounded"
                        resizeMode="cover"
                    />
                ) : null}

                {/* Foto de perfil superpuesta o aparte */}
                {photoURL ? (
                    <View className="items-center -mt-20">
                        <Image
                            source={{ uri: photoURL }}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                            resizeMode="cover"
                        />
                    </View>
                ) : null}
            </View>
            <TouchableOpacity
                className="bg-blue-600 p-3 rounded items-center"
                onPress={handleSave}
            >
                <Text className="text-white font-semibold">Guardar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditProfileScreen;

