import { addUser } from '@/db/beerAppDB';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
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
            if(createCredential) {
            if (!auth.currentUser) {
              throw new Error("User not found after registration.");
            }
            const user = {
              uid: auth.currentUser.uid,
              email: email,
            }
            await addUser({
              ...user,
            });
            router.replace('./beers');
          }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        }
    }
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
          <View className="w-full max-w-md">
            <Text className="text-3xl font-bold text-center mb-6">Login</Text>
    
            <Text className="text-lg mb-1">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
    
            <Text className="text-lg mb-1">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-6"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />
    
            <Pressable
              className="bg-blue-600 rounded-md py-3 mb-3"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-semibold">Login</Text>
            </Pressable>
    
            <Pressable
              className="bg-green-600 rounded-md py-3"
              onPress={handleRegister}
            >
              <Text className="text-white text-center font-semibold">Register</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
}

export default SessionScreen