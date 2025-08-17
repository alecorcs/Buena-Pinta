import React from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {
    className?: string;
}
const ThemedView = ({ className, style, children }: Props) => {
    return (
        <View className={`bg-light-background dark:bg-dark-background ${className}`} style={style}>
            {children}
        </View>
    )
}

export default ThemedView