// components/FloatButton.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type FloatButtonProps = {
  onPress: () => void;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
};

export const FloatButton = ({ onPress, iconName }: FloatButtonProps) => (
  <TouchableOpacity className="absolute right-5 bottom-10 bg-black p-4 active:opacity-80 rounded-full" onPress={onPress}>
    <Ionicons name={iconName} size={24} color="white" />
  </TouchableOpacity>
);
