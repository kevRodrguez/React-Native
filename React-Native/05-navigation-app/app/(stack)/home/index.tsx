import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import CustomButton from '../../../components/shared/customButton'

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <View className='px-10 mt-5'>

                {/* Método 1 para navegar entre pantallas */}
                <CustomButton
                    variant='contained'
                    color='primary'
                    onPress={() => router.push('/products')}
                    className='mb-2'>
                    Productos
                </CustomButton>

                {/* Método 2 para navegar entre pantallas */}

                <Link href={"/profile"} asChild>
                    <CustomButton
                        variant='contained'
                        color='secondary'
                        className='mb-2'>
                        Perfil
                    </CustomButton>
                </Link>

                <CustomButton
                    variant='contained'
                    color='tertiary'
                    onPress={() => router.push('/settings')}
                    className='mb-2'>
                    Ajustes
                </CustomButton>

                {/* <Text className='mb-5'>HomeScreen</Text>
                <Link className='mb-5' href={'/products'}>Productos</Link>
                <Link className='mb-5' href={'/profile'}>Perfil</Link>
                <Link className='mb-5' href={'/settings'}>Ajustes</Link> */}
            </View>


        </SafeAreaView>
    )
}

export default HomeScreen