import { View, Text, Platform } from 'react-native'
import React from 'react'
import ThemedView from '@/presentation/shared/ThemedView'
import ThemedText from '@/presentation/shared/ThemedText'
import { StatusBar } from 'expo-status-bar'
import ThemedButton from '@/presentation/shared/ThemedButton'
import { router } from 'expo-router'

const ModalScreen = () => {
    return (
        <ThemedView className=' justify-center items-center flex-1' >
            <ThemedText>Hola, soy otro ModalScreen-2</ThemedText>

            <StatusBar 
                style={Platform.OS === 'ios' ? 'light' : 'auto'}
            />

            <ThemedButton
                onPress = {() => {router.dismiss()}}
                className='mx-4 m-5'
            >
                Cerrar
            </ThemedButton>
        </ThemedView    >
    )
}

export default ModalScreen