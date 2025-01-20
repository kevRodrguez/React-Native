import { authCheckStatus, authLogin, authRegister } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";


export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    changeStatus: (token?: string, user?: User) => Promise<boolean>;

    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    //Properties
    status: 'checking',
    token: undefined,
    user: undefined,

    //Methods o actions en zustand

    changeStatus: async (token?: string, user?: User) => {
        // si la respuesta es null
        if (!token || !user) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });

            //llamar a logout o borrar el token
            await SecureStorageAdapter.deleteItem('token');
            return false;
        }

        set({ status: 'authenticated', token: token, user: user });

        //Guardar el token en el secure storage
        await SecureStorageAdapter.setItem('token', token);

        return true;
    },

    login: async (email: string, password: string) => {
        const response = await authLogin(email, password);

        return get().changeStatus(response?.token, response?.user);
        //CODIGO REPETIDO QUE SE REUTILIZA EN changeStatus
        // // si la respuesta es null
        // if (!response) {
        //     set({ status: 'unauthenticated', token: undefined, user: undefined });
        //     return false;
        // }

        // set({ status: 'authenticated', token: response.token, user: response.user });

        // return true;

    },

    register: async (email: string, password: string, fullName: string) => {
        console.log('Datos en el register:', email, password, fullName);
        const response = await authRegister(email, password, fullName);
        console.log('Respuesta de register en useAuthStore', response)
        return get().changeStatus(response?.token, response?.user);
    },

    checkStatus: async () => {

        const response = await authCheckStatus();
        console.log('Respuesta del authCheckStatus en useAuthStore:', response?.token, response?.user);

        get().changeStatus(response?.token, response?.user);

        //CODIGO REPETIDO QUE SE REUTILIZA EN changeStatus
        // // si la respuesta es null
        // if (!response) {
        //     set({ status: 'unauthenticated', token: undefined, user: undefined });
        //     return;
        // }

        // set({ status: 'authenticated', token: response.token, user: response.user });

        // return;
    },




    logout: async () => {
        //Borrar el token del secure storage
        SecureStorageAdapter.deleteItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    }
}))