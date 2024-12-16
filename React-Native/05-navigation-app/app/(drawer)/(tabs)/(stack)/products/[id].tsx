import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { products } from '@/store/products.store';

const ProductScreen = () => {
    const { id } = useLocalSearchParams();
    console.log(id);

    const product = products.find((product) => product.id === id);

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            title: product?.title || 'Producto',
        })
    }, [product])

    if (!product) {
        return <Redirect href={'/home'} />
    }

    return (
        <SafeAreaView>

            <View className='px-5 mt-10'>
                <Text className='font-work-black text-3xl'>{product.title}</Text>
                <Text className='mt-2'>{product.description}</Text>
                <Text className='mt-2 font-work-black'>${product.price}</Text>
            </View>
        </SafeAreaView>
    )
}

export default ProductScreen