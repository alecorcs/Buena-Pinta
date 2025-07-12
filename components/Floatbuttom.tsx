// components/FloatButton.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable } from 'react-native';

type FloatButtonProps = {
  onPress: () => void;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
};

export const FloatButton = ({ onPress, iconName}: FloatButtonProps) => (
  <Pressable className="absolute right-5 bottom-10 bg-black p-4 rounded-full" onPress={onPress}>
    <Ionicons name={iconName} size={24} color="white" />
  </Pressable>
);
