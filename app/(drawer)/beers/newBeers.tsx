import { addBeer, addImage } from '@/db/beerAppDB';
import { Beer, beerTypes } from '@/types/type';
import { pickImage } from '@/utils/pickImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const ratings = [1, 2, 3, 4, 5];

const NewBeers = () => {
  const router = useRouter();

  const goBack = () => {
  if (router.canGoBack()) {
    router.back();
  }else {
    router.replace('./beers');
  }
  };

  const [form, setForm] = useState<Partial<Beer>>({
    name: '',
    types: 'Lager',
    country: '',
    alcoholContent: 0,
    description: '',
    imageUrl: '',
    rating: 3,
  });

  const handleChange = (field: keyof Beer, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };


  const pickImageHandler = () => {
  Alert.alert(
    'Seleccionar imagen',
    '¿Cómo quieres añadir la imagen?',
    [
      {
        text: 'Desde la cámara',
        onPress: async () => {
          const selectedUri = await pickImage('camera');
          if (selectedUri) {
            const imageUrl = await addImage(selectedUri);
            if (imageUrl) {
              handleChange('imageUrl', imageUrl);
            } else {
              Alert.alert('Error', 'No se pudo subir la imagen.');
            }
          }
        },
      },
      {
        text: 'Desde galería',
        onPress: async () => {
          const selectedUri = await pickImage('gallery');
          if (selectedUri) {
            const imageUrl = await addImage(selectedUri);
            if (imageUrl) {
              handleChange('imageUrl', imageUrl);
            } else {
              Alert.alert('Error', 'No se pudo subir la imagen.');
            }
          }
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ],
    { cancelable: true }
  );
};


   const handleSubmit = async () => {
    if (!form.name || !form.types || !form.description || !form.rating || !form.imageUrl) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      await addBeer(form as Beer);
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
            <Pressable onPress={goBack}>
              <Ionicons className='ml-4' name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text className="text-xl font-bold mb-2">Añadir nueva cerveza</Text>

        <Text className="text-sm mt-3">Nombre</Text>
        <TextInput
          className="border p-2 rounded bg-gray-100"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />

        <Text className="text-sm mt-3">Tipo</Text>
        <View className="border rounded bg-gray-100">
          <Picker
            selectedValue={form.types}
            onValueChange={(value) => handleChange('types', value)}
          >
            {beerTypes.map((type) => (
              <Picker.Item label={type} value={type} key={type} />
            ))}
          </Picker>
        </View>

        <Text className="text-sm mt-3">País</Text>
        <TextInput
          className="border p-2 rounded bg-gray-100"
          value={form.country}
          onChangeText={(text) => handleChange('country', text)}
        />

        <Text className="text-sm mt-3">Alcohol (%)</Text>
        <TextInput
          className="border p-2 rounded bg-gray-100"
          keyboardType="decimal-pad"
          value={form.alcoholContent?.toString()}
            onChangeText={(text) =>
            handleChange('alcoholContent', parseFloat(text.replace(',', '.')) || 0)
          }
        />

        <Text className="text-sm mt-3">Descripción</Text>
        <TextInput
          className="border p-2 rounded bg-gray-100 h-24 text-start"
          multiline
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
        />

        <Text className="text-sm mt-3">Valoración cervecera</Text>
        <View className="border rounded bg-gray-100">
          <Picker
            selectedValue={form.rating}
            onValueChange={(value) => handleChange('rating', value)}
          >
            {ratings.map(r => (
              <Picker.Item label={`${r}`} value={r} key={r} />
            ))}
          </Picker>
        </View>

        <Pressable
            className="mt-6 p-4 bg-gray-200 rounded items-center"
            onPress={pickImageHandler}
            >
            <Ionicons name="image-outline" size={24} color="black" />
            <Text>Seleccionar imagen (opcional)</Text>
        </Pressable>
        {form.imageUrl ? (
        <Image
            source={{ uri: form.imageUrl }}
            className="w-full h-48 mt-4 rounded"
            resizeMode="cover"
        />
        ) : null}

        <Pressable
          className="mt-6 bg-black p-4 rounded items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold">Guardar cerveza</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewBeers;
