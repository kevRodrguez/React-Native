import { create } from "zustand";
import { Gender, Product } from "../interfaces/product.interface";
import axios from "axios";
import { productsApi } from "@/core/api/productsApi";



//el objeto Partial permite que todas las propiedades del objeto sean opcionales
export const updateCreateProduct = async (product: Partial<Product>) => {

    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock); //esto es para que el stock sea un número
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    //'new' es un id que se le agregara cuando se cree un nuevo producto
    if (product.id && product.id !== 'new') {
        console.log('entre a actualizar producto')
        return updateProduct(product);
    }

    return createProduct(product);

}

//funcion para preparar las imagenes
const prepareImages = async (images: string[]): Promise<string[]> => {
    const fileImages = images.filter((image) => image.startsWith("file")); //filtra las imagenes que empiezan con file
    const currentImages = images.filter((image) => !image.startsWith("file")); //filtra las imagenes que no empiezan con file

    if (fileImages.length > 0) {
        const uploadPromises = fileImages.map((img) => uploadImage(img));
        const uploadedImages = await Promise.all(uploadPromises); //espera a que todas las promesas se cumplan, para que se suban todas las imagenes

        currentImages.push(...uploadedImages);
    }

    return currentImages.map((img) => img.split('/').pop()!); //el signo de admiracion es para decirle a typescript que no va a ser nulo
}

//funcion para cargar la imagen
const uploadImage = async (image: string): Promise<string> => {

    const formData = new FormData() as any;
    formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: image.split('/').pop()!,
    });

    const { data } = await productsApi.post<{ image: string }>('/files/product',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data' //esto es para que sepa que se esta enviando un archivo y no un json
            }
        }
    );
    return data.image;
}

const updateProduct = async (product: Partial<Product>) => {
    // console.log({images: product.images}) esto es para ver si se estan enviando las imagenes

    const { id, images = [], user, ...rest } = product; //separa esos datos del resto del objeto

    try {

        const checkImages = await prepareImages(images);

        const { data } = await productsApi.patch<Product>(`/products/${id}`, {
            //procesar las imagenes
            ...rest,
            images: checkImages
        });
        return data;
    } catch (error) {
        throw new Error("Error al actualizar el producto");
    }
}

const createProduct = async (product: Partial<Product>) => {
    const { id, images = [], user, ...rest } = product; //separa esos datos del resto del objeto

    try {
        const checkImages = await prepareImages(images);

        const { data } = await productsApi.post<Product>(`/products`, {
            //procesar las imagenes
            ...rest,
            images: checkImages

        });
        return data;
    } catch (error) {
        throw new Error("Error al crear el producto");
    }
}

export const deleteProduct = async (id: string) => {
    try {
        await productsApi.delete(`/products/${id}`);
    } catch (error) {
        throw new Error("Error al eliminar el producto");
    }
}

