import { View, Text } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useLocalSearchParams } from 'expo-router'

const ChatByIdScreen = () => {

    const { id } = useLocalSearchParams();


    return (
        <View style={{ marginHorizontal: 10, marginTop: 5 }}>
            <ThemedText style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10

            }}>Push ID Information Screen</ThemedText>

            <ThemedText style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10

            }}>Chat ID {id}</ThemedText>
        </View>
    )
}

export default ChatByIdScreen