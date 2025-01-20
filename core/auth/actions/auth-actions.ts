import { productsApi } from "../api/productsApi";
import { RegisterUser, User } from "../interface/user";
import { Alert } from "react-native";

export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

export interface AuthErrorResponse {
    statusCode: number;
    message: string[] | string;
    error: string;
}

const returnUserToken = (data: AuthResponse): { user: User; token: string } => {
    const { token, ...user } = data;
    return { user, token };
};

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase().trim();

    try {
        const { data } = await productsApi.post<AuthResponse>('/auth/login', {
            email, password
        });

        return returnUserToken(data);
    } catch (error: any) {
        if (error.response && error.response.data) {
            //hago un tipado de el error, ya que se que me regresara un json del tipo AuthErrorResponse
            const errorData: AuthErrorResponse = error.response.data;

            //Verifico si el mensaje es un array, si es asi lo uno con una coma, si no lo dejo como string
            const errorMessage = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;

            Alert.alert("Error de inicio de sesión", errorMessage);
        } else {
            Alert.alert("Error", "Ocurrió un problema desconocido");
        }
        return null;
    }
};

export const authRegister = async (email: string, password: string, fullName: string) => {
    email = email.toLowerCase().trim();

    try {
        const { data } = await productsApi.post<AuthResponse>('/auth/register', {
            email, password, fullName
        });

        return returnUserToken(data);
    } catch (error: any) {
        console.log('Error en el registro', error);

        if (error.response && error.response.data) {
            const errorData: AuthErrorResponse = error.response.data;

            const errorMessage = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;

            Alert.alert('Error en el registro:', errorMessage);

        } else {
            Alert.alert("Error", "Ocurrió un problema desconocido");
        }
        return null;
    }
};

export const authCheckStatus = async () => {
    try {
        const { data } = await productsApi.get<AuthResponse>('/auth/check-status');

        return returnUserToken(data);
    } catch (error: any) {
        if (error.response && error.response.data) {
            const errorData: AuthErrorResponse = error.response.data;

            console.log('Error en el authCheckStatus', errorData);
            //Alert.alert("Error de estado", errorData.message);
        } else {
            Alert.alert("Error", "Ocurrió un problema desconocido");
        }
        return null;
    }
};