import { View, Text, ActivityIndicator, useColorScheme } from 'react-native'
import React, { useEffect } from 'react'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { useProducts } from '@/presentation/products/hooks/useProducts'
import { LinearGradient } from 'expo-linear-gradient'

import { NavigationProp } from '@react-navigation/native';
import { Header } from 'react-native/Libraries/NewAppScreen'
import ProductList from '@/presentation/products/components/ProductList'
import { FAB } from '@/presentation/theme/components/FAB'
import { router } from 'expo-router'

const HomeScreen = () => {

  const primaryColor = useThemeColor({}, 'primary')
  const colorScheme = useColorScheme();

  const { productsQuery, loadNextPage } = useProducts();


  if (productsQuery.isLoading) {
    return (
      <>
        <View className='flex-1, justify-center, items-center'>
          {/* <LinearGradient
            colors={
              colorScheme === 'dark'
                ? [primaryColor, '#5e2ced', 'black']
                : ['#3D64F4', '#17c7bd', 'white']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 0.3, y: 0.4 }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          /> */}
          <ActivityIndicator size={30} />

        </View>
      </>
    )
  }

  return (
    <View style={{ paddingTop: 10 }}>
      <ProductList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />

      <FAB
        iconName='add'
        onPress={() => router.push('/(products-app)/product/new')} //se le pone new porque en las create-update-product.action.ts se valida si el id es 'new' para crear un nuevo producto.
      />
    </View>
  )
}

export default HomeScreen