import { getProducts } from '@/core/products/actions/get-products.action'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'

export const useProducts = () => {

    const productsQuery = useInfiniteQuery({
        queryKey: ['products', 'infinite'],

        queryFn: ({ pageParam }) => getProducts(20, pageParam * 20), //20 productos por pagina, 0x20, 1x20, 2x20
        staleTime: 1000 * 60 * 60, //1 Hora
        initialPageParam: 0,

        //all pages es un arreglo de arreglos [[p1, p2, p3], [p4, p5, p6]]
        getNextPageParam: (lastPage, allPages) => allPages.length,
    })

    return {
        productsQuery,

        //Methods
        loadNextPage: productsQuery.fetchNextPage,

    }
}
