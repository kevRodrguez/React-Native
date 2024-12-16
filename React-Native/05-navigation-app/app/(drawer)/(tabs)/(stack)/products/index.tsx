import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { products } from '@/store/products.store'

const ProductsScreen = () => {
    return (
        <SafeAreaView>
            <View className='px-4'>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className='mt-10'>
                            <Text className='text-2xl font-work-black'>{item.title}</Text>
                            <Text className='justify-self-auto'>{item.description}</Text>

                            <View className='flex flex-row justify-between mt-2'>
                                <Text className='font-work-black'>${item.price}</Text>
                                <Link href={`/products/${item.id}`} className='text-blue-500'>Ver detalles
                                </Link>
                            </View>
                        </View>
                    )}
                >
                </FlatList>
            </View>

        </SafeAreaView>
    )
}

export default ProductsScreen