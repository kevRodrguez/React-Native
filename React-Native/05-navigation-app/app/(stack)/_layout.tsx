import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot, Stack, useLocalSearchParams } from 'expo-router'
import { products } from '@/store/products.store';

const StackLayout = () => {

    return (
        <Stack
            screenOptions={{
                //para ocultar el header de la pantalla
                //headerShown: false,

                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: 'white',
                },
                //para cambiar el color del texto del header
                headerTintColor: 'black',

                statusBarTranslucent: true,
            }

            }
        >
            <Stack.Screen
                name='home/index'
                options={{
                    title: 'Inicio',

                }}
            />

            <Stack.Screen
                name='profile/index'
                options={{
                    title: 'Perfil',
                    animation: 'simple_push'
                }}
            />

            <Stack.Screen
                name='settings/index'
                options={{
                    title: 'Ajustes',
                    animation: 'ios_from_right'
                }}
            />

            <Stack.Screen
                name='products/index'
                options={{
                    title: 'Productos',
                }}
            />

            <Stack.Screen
                name='products/[id]'
                options={{
                    title: 'Detalles del producto',
                }}
            />
        </Stack>
    )
}

export default StackLayout