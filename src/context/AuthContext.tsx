import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

enum AuthStatus {
    checking = 'checking',
    authenticated = 'authenticated',
    notAuthenticated = 'Not Authenticated'
}

interface User {
    email: string
    name: string
}

interface AuthState {
    status: AuthStatus
    token?: string

    user?: User
    isChecking: boolean
    isAuthenticated: boolean

    loginWithEmailPassword: (email: string, password: string) => void
    logout: () => void
}

//crear el context de auth
export const AuthContext = createContext({} as AuthState);

//custom hook para acceder al context de auth 
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const [status, setStatus] = useState(AuthStatus.checking);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        setTimeout(() => {
            setStatus(AuthStatus.notAuthenticated)
        }, 1500)

    }, [])


    const loginWithEmailPassword = (email: string, password: string) => {
        console.log(password);

        setUser({
            email: email,
            name: 'Kevin Rodriguez'
        })
        setStatus(AuthStatus.authenticated);
    }

    const logout = () => {
        setUser(undefined);
        setStatus(AuthStatus.notAuthenticated);
    }



    return (
        <AuthContext.Provider
            value={{
                status: status,
                user: user,

                //Getter
                isChecking: status === AuthStatus.checking,
                isAuthenticated: status === AuthStatus.authenticated,

                //Method
                loginWithEmailPassword,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}
