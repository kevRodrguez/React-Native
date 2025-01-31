import { API_URL, productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/product.interface";


export const getProducts = async (limit = 20, offset = 0) => {
    try {
        //las llaves de Product[] es para decirle a typescript que es un arreglo de productos
        const { data } = await productsApi.get<Product[]>('/products', {
            params: {
                limit,
                offset
            }
        })

        //console.log(data); para verificar si se esta obteniendo la data

        //return data;

        //Esto mapea las imagenes de los productos para que se vean en la app, ya en la base de datos no se guarda el url completo
        return data.map(product => ({
            ...product,
            images: product.images.map(
                image => `${API_URL}/files/product/${image}`
            )
        }));

    } catch (error) {
        throw new Error('Error al obtener los productos');
    }
}