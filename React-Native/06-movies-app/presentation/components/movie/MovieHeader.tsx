import { View, Text, useWindowDimensions, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { Image } from 'expo-image';



interface Props {
    poster: string
    originalTitle: string
    title: string
}

const MovieHeader = ({ poster, originalTitle, title }: Props) => {

    const { height } = useWindowDimensions();

    return (
        <>
            {/* gradiente para boton de retroceso */}
            <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'transparent']}
                start={{ x: 1, y: 0 }}
                style={{
                    position: 'absolute',
                    height: height * 0.7,
                    zIndex: 1,
                    width: '100%'
                }}
            />

            <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 999, elevation: 999 }}>
                <Pressable
                    onPress={() => router.back()}
                    onPressIn={() => Haptics.selectionAsync()}>
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color="white"
                        className='shadow' />
                </Pressable>
            </View>

            <View
                className='shadow-xl shadow-black/20'
                style={{ height: height * 0.7 }}>

                <View className='flex-1 rounded-b-[35px] overflow-hidden'>
                    <Image
                        //Estos dos datos funcionan solamente si se importe de react-native, transition no funciona con react native
                        
                        //resizeMode="cover"
                        //className='flex-1'


                        source={{ uri: poster }}
                        style={{ width: "100%", height: "100%", alignSelf: 'center' }}
                        transition={1000}

                    />
                </View>
            </View>

            <View className='px-4 py-4'>
                <Text className='text-xl text-[#FBFFFF] mb-4'>{originalTitle}</Text>
                <Text className='text-4xl font-bold text-[#FBFFFF]'>{title}</Text>
            </View>
        </>
    )
}

export default MovieHeader