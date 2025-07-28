import { Beer, beerTypes } from '@/constants/type';
import { addBeer } from '@/db/beerAppDB';
import { launchImageFlow } from '@/utils/alertPickImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



//const ratings = [1, 2, 3, 4, 5];

const NewBeers = () => {


  const [value, setValue] = useState(0);
  const router = useRouter();


  const [form, setForm] = useState<Partial<Beer>>({
    name: '',
    types: 'Lager',
    country: '',
    alcoholContent: '0',
    description: '',
    imageUrl: '',
    rating: 3,
  });

  const handleChange = (field: keyof Beer, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };


  const pickImageHandler = () => {
    launchImageFlow((url) => {
      handleChange('imageUrl', url);
    }, false);
  };


  const handleSubmit = async () => {
    if (!form.name || !form.types || !form.description || !form.rating || !form.imageUrl) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      await addBeer(form as Beer);
      Alert.alert('Cerveza añadida', 'Tu cerveza ha sido guardada con éxito');
      setForm({
        name: '',
        types: 'Lager',
        country: '',
        alcoholContent: '0',
        description: '',
        imageUrl: '',
        rating: 3,
      });
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
            <TouchableWithoutFeedback onPress={() => router.back()}>
              <Ionicons className='ml-4 active:opacity-40' name="chevron-back-outline" size={24} color="black" />
            </TouchableWithoutFeedback>
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
          value={form.alcoholContent}
          onChangeText={(text) =>
            handleChange('alcoholContent', text)
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
        <View className="h-20 items-center border rounded bg-gray-100 px-4 justify-center">
          <Text className="mb-2 text-xl font-bold text-gray-700">{value}/5</Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#4ade80"
            maximumTrackTintColor="#d1d5db"
            thumbTintColor="#10b981"
            value={value}
            onValueChange={(val) => {
              setValue(val);
              handleChange('rating', val);
            }}
          />
        </View>

        <TouchableOpacity
          className="mt-6 p-4 bg-gray-200 active:opacity-80 rounded items-center"
          onPress={pickImageHandler}
        >
          <Ionicons name="image-outline" size={24} color="black" />
          <Text>Seleccionar imagen (opcional)</Text>
        </TouchableOpacity>
        {form.imageUrl ? (
          <Image
            source={{ uri: form.imageUrl }}
            className="w-full h-48 mt-4 rounded"
            resizeMode="cover"
          />
        ) : null}

        <TouchableOpacity
          className="mt-6 bg-black active:opacity-80 p-4 rounded items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold">Guardar cerveza</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewBeers;