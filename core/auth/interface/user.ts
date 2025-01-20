export interface User {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
}

export interface RegisterUser {
    email: string;
    fullName: string;
    id: string;
    isActive: boolean;
    roles: string[];
}
