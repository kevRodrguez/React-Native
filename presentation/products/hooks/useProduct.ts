import { updateCreateProduct, deleteProduct } from '@/core/products/actions/create-update-delete-product.action';
import { getProductById } from '@/core/products/actions/get-product-by-id.action';
import { Product } from '@/core/products/interfaces/product.interface';
import { useCameraStore } from '@/presentation/store/useCameraStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Alert } from 'react-native';

export const useProduct = (productId: string) => {

  const { clearImages } = useCameraStore();

  const queryClient = useQueryClient();
  const productIdRef = useRef(productId);

  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  // Mutación para crear o actualizar productos
  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      updateCreateProduct({
        ...data,
        id: productIdRef.current,
      }),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id;
      clearImages();

      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });
      queryClient.invalidateQueries({
        queryKey: ['products', data.id],
      });
      Alert.alert('Producto guardado', `${data.title} se guardó correctamente`);

    },
    onError: (error: Error) => {
      console.error('Error al guardar el producto', error);
      Alert.alert('Error al guardar el producto', error.message);
    },
  });

  // mutación para eliminar productos
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => deleteProduct(id),
    onSuccess: () => {
      clearImages();

      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });
      Alert.alert('Producto eliminado', 'El producto fue eliminado correctamente');
      router.dismiss();
    },
    onError: (error: Error) => {
      console.error('Error al eliminar el producto', error);
      Alert.alert('Error al eliminar el producto', error.message);
    },
  });

  return {
    productQuery,
    productMutation,
    deleteProductMutation,
  };
};