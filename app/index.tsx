import { addUser } from '@/db/beerAppDB';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../FirebaseConfig';

const SessionScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('./beers');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) router.replace('./beers');
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  }

  const handleRegister = async () => {
    try {
      const createCredential = await createUserWithEmailAndPassword(auth, email, password);

      const { user } = createCredential;
      if (!user) {
        throw new Error("User not found after registration.");
      }
      if (!user.email) {
        throw new Error("Email not found for registered user.");
      }

      const userData = {
        uid: user.uid,
        email: user.email,
      };

      await addUser(userData);

      router.replace('./beers');

    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  }
  return (
    <LinearGradient
      colors={['#FFD700', '#FFA500']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className='flex-1 w-full h-full justify-center items-center'
    >
      <View className="w-full h-full px-6 max-w-md">
        <Image
          source={require('@/assets/images/login-image.png')}
          className='w-full h-56 mb-11' />
        <Text className="text-3xl font-bold text-center mb-6">Login</Text>

        <Text className="text-lg mb-1">Email</Text>
        <TextInput
          className="border border-blue-600 rounded-md p-3 mb-4 font-bold"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-lg mb-1">Password</Text>
        <TextInput
          className="border border-blue-600 rounded-md p-3 mb-6 font-bold"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <TouchableOpacity
          className="bg-blue-600 active:opacity-80 rounded-md py-3 mb-3"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-green-600 active:opacity-80 rounded-md py-3"
          onPress={handleRegister}
        >
          <Text className="text-white text-center font-semibold">Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default SessionScreen