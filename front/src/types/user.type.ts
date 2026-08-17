export interface UserRegister {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
}

export type AuthUser = Omit<UserRegister, 'password'>

export interface FormBody {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

// ==========================================
// FLOW 1 - Structure des données utilisateur utilisées pour l'authentification
// Contrat TypeScript qui définit la structure d'un utilisateur connecté
// ==========================================

export interface UserLogin {
    id: number;
    email: string;
    password: string;
    role: string;
}

export interface UserInfos {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
    createdAt: Date
    updatedAt: Date
}