import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { products } from '@/store/products.store';

const ProductScreen = () => {
    const { id } = useLocalSearchParams();
    console.log(id);

    const product = products.find((product) => product.id === id);
    if (!product) {
        return <Redirect href={'/(stack)/home'} />
    }

    return (
        <View className='px-5 mt-10'>
            <Text className='font-work-black text-2xl'>{product.title}</Text>
            <Text className='mt-2'>{product.description}</Text>
            <Text className='mt-2 font-work-black'>${product.price}</Text>
        </View>
    )
}

export default ProductScreen