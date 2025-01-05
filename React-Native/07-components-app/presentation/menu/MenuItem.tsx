import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Href, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import ThemedText from '../shared/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'



interface Props {
    title: string
    icon: keyof typeof Ionicons.glyphMap;
    name: string

    isFirst?: boolean
    isLast?: boolean
}

const MenuItem = ({ title, icon, name, isFirst = false, isLast = false }: Props) => {
    //animation-101/index | hay que cortar la parte del index (.tsx) para que funcione la navegación 
    const [routeName] = name.split('/')

    const primaryColor = useThemeColor({}, 'primary')

    return (
        <Pressable
            onPress={() => router.push(routeName as Href)}
            className='bg-white dark:bg-black/15 px-5 py-2'
            style={{
                borderTopLeftRadius: isFirst ? 10 : 0,
                borderTopRightRadius: isFirst ? 10 : 0,
                paddingTop: 10,


                borderBottomLeftRadius: isLast ? 10 : 0,
                borderBottomRightRadius: isLast ? 10 : 0,

            }} 
        >
            <View className='flex-row items-center'>
                <Ionicons name={icon} size={30} color={primaryColor} className='mr-5'/>
                <ThemedText type="h2"> {title} </ThemedText>
            </View>
        </Pressable>
    )
}

export default MenuItem