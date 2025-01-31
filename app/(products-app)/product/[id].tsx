import { View, Text, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ThemedView } from '@/presentation/theme/components/ThemedView'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput'
import { useProduct } from '@/presentation/products/hooks/useProduct'
import ProductImages from '@/presentation/products/components/ProductImages'
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup'
import ThemedButton from '@/presentation/theme/components/ThemedButton'
import { Formik } from 'formik'
import { Size } from '@/core/products/interfaces/product.interface'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import MenuIconButton from '@/presentation/theme/components/MenuIconButton'
import { useCameraStore } from '@/presentation/store/useCameraStore'
import { RefreshControl } from 'react-native-gesture-handler'

const ProductScreen = () => {

  const { selectedImages, clearImages } = useCameraStore();

  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  //productQuery dispara la petición en cuanto es declarada, mientra que productMutation es una función que se puede llamar cuando se necesite
  const { productQuery, productMutation, deleteProductMutation } = useProduct(`${id}`);

  useEffect(() => {

    return () => {
      clearImages();
    }
  }, []);


  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title
      })
    }
  }, [productQuery.data]);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          icon='camera-outline'
          onPress={() => router.push('/camera')}
        />
        //<Ionicons name='camera-outline' size={24} color={iconColor} />
      )
    })
  }, []);

  if (productQuery.isLoading) {
    return (
      <View className='flex-1, justify-center, items-center'>
        <ActivityIndicator size={30} />
      </View>
    )
  }

  if (!productQuery.data) {
    return (
      <Redirect href={'/(products-app)/(home)'} />
    )
  }


  const product = productQuery.data;

  return (
    <Formik
      initialValues={product} // aqui se inicializan los valores del formulario, product = values
      // onSubmit={productMutation.mutate} handleSubmit manda a llamar esta función onSubmit, esto es lo mismo que lo de abajo
      onSubmit={(productLike) => productMutation.mutate({
        ...productLike,
        images: [...product.images, ...selectedImages]
      })}

    >
      {
        ({ values, handleChange, setFieldValue, handleSubmit }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}

          >
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={productQuery.isFetching}
                  onRefresh={ async () => {
                    await productQuery.refetch();
                  }}
                />
              }
            >

              {/* <ProductImages images={values.images} /> */}
              <ProductImages images={[...product.images, ...selectedImages]} />

              <ThemedView style={{ marginHorizontal: 10, marginTop: 10 }}>
                <ThemedTextInput
                  placeholder='Título'
                  style={{ marginVertical: 5 }}
                  value={values.title}
                  onChangeText={handleChange('title')}
                />

                <ThemedTextInput
                  placeholder='Slug'
                  style={{ marginVertical: 5 }}
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                />

                <ThemedTextInput
                  placeholder='Descripción'
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5 }}
                  value={values.description}
                  onChangeText={handleChange('description')}
                />
              </ThemedView>

              <ThemedView style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', gap: 10 }}>
                <ThemedTextInput
                  placeholder='Precio'
                  style={{ flex: 1 }}
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}
                />

                <ThemedTextInput
                  placeholder='Inventario'
                  style={{ flex: 1 }}
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}

                />
              </ThemedView>

              <ThemedView
                style={{ marginHorizontal: 10 }}>
                <ThemedButtonGroup
                  options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                  selectedOptions={values.sizes}
                  onSelect={(selectedSize) => {
                    const newSizes = values.sizes.includes(selectedSize as Size)
                      ? values.sizes.filter((size: Size) => size !== selectedSize)
                      : [...values.sizes, selectedSize];

                    setFieldValue('sizes', newSizes);
                  }}
                />

                <ThemedButtonGroup
                  options={['kid', 'men', 'women', 'unisex']}
                  selectedOptions={[values.gender]}
                  onSelect={(selectedOption) => setFieldValue('gender', selectedOption)}

                />
              </ThemedView>

              {/* Boton para guardar */}

              <ThemedView
                style={{
                  marginHorizontal: 10, marginBottom: 50, marginTop: 20, flexDirection:
                    'row', justifyContent: 'center', gap: 10
                }}>
                <ThemedButton
                  style={{ flex: 1 }}
                  icon='bookmark-outline'
                  onPress={() => { handleSubmit() }}
                >
                  Guardar
                </ThemedButton>

                <ThemedButton
                  style={{ backgroundColor: 'red' }}
                  icon='trash-outline'
                  onPress={() => { deleteProductMutation.mutate(product.id) }}
                />



              </ThemedView>


            </ScrollView>
          </KeyboardAvoidingView>

        )
      }
    </Formik>
  )
}

// test5@google.com

export default ProductScreen