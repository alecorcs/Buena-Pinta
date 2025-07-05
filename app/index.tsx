import { router } from 'expo-router'; // Import the useRouter hook from expo-router
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import the signInWithEmailAndPassword function
import React, { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../FirebaseConfig'; // Import the auth object from FirebaseConfig

const SessionScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) router.replace('./drawer');
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials.");
        }
    }

    const handleRegister = async () => {
        try {
            const createCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (createCredential) router.replace('./drawer');
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        }
    }
    return (
        <SafeAreaView>
            <Text>SessionScreen</Text>
        </SafeAreaView>
    )
}

export default SessionScreen