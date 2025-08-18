// components/FloatButton.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type FloatButtonProps = {
  onPress: () => void;
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
};

export const FloatButton = ({ onPress, iconName }: FloatButtonProps) => {
  const { isDarkFloatButton } = useThemeColor();
  return (
    <TouchableOpacity className="absolute right-5 bottom-10 bg-light-floatButtom dark:bg-dark-floatButtom p-4 active:opacity-80 rounded-full" onPress={onPress}>
      <Ionicons name={iconName} size={24} color={isDarkFloatButton} />
    </TouchableOpacity>
  );
};
