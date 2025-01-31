import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, Product } from "../interfaces/product.interface";


const emptyProduct: Product = {
    id: '',
    title: 'Nuevo Producto',
    description: '',
    price: 0,
    stock: 0,
    images: [],
    slug: '',
    gender: Gender.Men,
    sizes: [],
    tags: [],
}

export const getProductById = async (id: string):Promise<Product> => {

    if (id === 'new') {
        return emptyProduct;
    }
    
    try {
        
        const { data } = await productsApi.get<Product>(`/products/${id}`);
        //console.log('producto:', data);

        //return data;\

        return {
            ...data,
            images: data.images.map((image) => `${API_URL}/files/product/${image}`),
        }
        
    } catch (error) {
        console.log('error:', error);
        throw new Error(`Error al obtener el producto con el id: ${id}`);
    }
}