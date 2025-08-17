import React from 'react'
import { View, ViewProps } from 'react-native'

interface Props extends ViewProps {
    className?: string
}
const ThemedCard = ({ className, children }: Props) => {
    return (
        <View
            className={`bg-gray-100/70 dark:bg-black/10 rounded-xl p-2 shadow shadow-black/5 px-3 ${className}`}>
            {children}
        </View>
    )
}

export default ThemedCard