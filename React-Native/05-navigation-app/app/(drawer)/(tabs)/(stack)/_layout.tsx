import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, router, Slot, Stack, useNavigation } from 'expo-router'
import { products } from '@/store/products.store';
import { DrawerActions, StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Route } from 'expo-router/build/Route';

const StackLayout = () => {
    const navigation = useNavigation()

    const onHeaderLeftClick = (canGoBack: boolean = true) => {
        if (canGoBack) {
            // navigation.dispatch(StackActions.pop()) no funciona para la version de react
            router.back()
            return
        }
        navigation.dispatch(DrawerActions.toggleDrawer())
    }

    return (
        <Stack
            screenOptions={{
                //para ocultar el header de la pantalla
                headerShown: true, //inicio

                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: 'white',
                },
                //para cambiar el color del texto del header
                headerTintColor: 'black',

                statusBarTranslucent: true,
                //headerShown: false,
                headerLeft: ({ tintColor, canGoBack }) => (
                    <Ionicons
                        name={canGoBack ? 'arrow-back-outline' : 'menu'}
                        className='mr-5'
                        size={24}
                        color={tintColor}
                        onPress={() => onHeaderLeftClick(canGoBack)}
                    />
                )
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