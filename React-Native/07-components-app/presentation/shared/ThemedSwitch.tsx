import { View, Text, Switch, Pressable, Platform } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

interface Props {
    text?: string
    value: boolean
    className?: string

    onValueChange: (value: boolean) => void
}

const isAndroid: boolean = Platform.OS === 'android'

const ThemedSwitch = ({ text, value, className, onValueChange }: Props) => {

    const switchActiveColor = useThemeColor({}, 'primary')
    return (
        <Pressable
            className={`flex mx-2 flex-row items-center justify-between active:opacity-80 ${className}`}
            onPress={() => onValueChange(!value)}
        >
            {text ? <ThemedText type='h2'>{text}</ThemedText> : <View />}
            <Switch
                value={value}
                onValueChange={onValueChange}
                thumbColor={isAndroid ? switchActiveColor : ''}
                // ios_backgroundColor={ value ? 'green' : 'red'}

                trackColor={{ 
                    false: 'grey', 
                    true: switchActiveColor
                }}
            />
        </Pressable>
    )
}

export default ThemedSwitch