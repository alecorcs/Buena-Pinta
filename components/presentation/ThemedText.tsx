import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
    className?: string;
}
const ThemedText = ({ className, style, children }: Props) => {
    return (
        <Text className={`text-light-text dark:text-dark-text ${className}`} style={style}>
            {children}
        </Text>
    )
}

export default ThemedText