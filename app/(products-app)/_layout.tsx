import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import { useAuthStore } from '@/presentation/auth/store/useAuthStore'
import { Redirect, Stack } from 'expo-router'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage.adapter'
import LogoutIconButton from '@/presentation/auth/components/LogoutIconButton'

const CheckAuthenticationLayout = () => {

    const { status, checkStatus } = useAuthStore();
    const backgroundColor = useThemeColor({}, 'background')

    useEffect(() => {
        checkStatus()
    }, [])


    if (status === 'checking') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                <ActivityIndicator size={'small'} />
            </View>
        )
    }

    if (status === 'unauthenticated') {
        //aca se puede guardar la ruta del usuario en un keyvaluepair y redirigirlo a esa ruta despues del login
        return (
            <Redirect href='/auth/login' />
        )
    }



    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: backgroundColor
                },
                contentStyle: { backgroundColor: backgroundColor }

            }}
        >
            <Stack.Screen
                name='(home)/index'
                options={{
                    title: 'Productos',
                    headerLeft: () => <LogoutIconButton />
                }}

            />
        </Stack>
    )
}

export default CheckAuthenticationLayout