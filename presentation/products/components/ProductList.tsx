import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import { Product } from '@/core/products/interfaces/product.interface'
import ProductCard from './ProductCard'
import { useQueryClient } from '@tanstack/react-query'
import { RefreshControl } from 'react-native-gesture-handler'

interface Props {
    products: Product[],
    loadNextPage: () => void
}

const ProductList = ({ products, loadNextPage }: Props) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryClient = useQueryClient();

    const onPullToRefresh = async () => {
        setIsRefreshing(true)
        await new Promise((resolve) => setTimeout(resolve, 200))

        //esto es para que se refresque la data de la lista de productos cuando se haga pull to refresh en la app, invalidando la cache de la lista y volviendo a cargar la data 
        queryClient.invalidateQueries({
            queryKey: ['products', 'infinite']
        })
        setIsRefreshing(false)
    }

    return (
        <FlatList
            data={products}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <ProductCard product={item} />
            )}

            onEndReached={loadNextPage}
            onEndReachedThreshold={0.8}
            showsVerticalScrollIndicator={false}

            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
            }

        />
    )
}

export default ProductList