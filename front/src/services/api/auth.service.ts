import apiClient from "./apiClient";
import type { UserLogin, UserRegister } from "../../types/user.type";

export interface SignUpResponse {
    user: Omit<UserRegister, "password">;
    accessToken: string;
}

export interface SignInResponse {
    user: Omit<UserLogin, "password">;
    accessToken: string;
}

export async function signUp(
    body: Omit<UserRegister, "id" | "role">,
): Promise<SignUpResponse> {
    try {
        const { data } = await apiClient.post<SignUpResponse>(`/auth/register`, body);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// ==========================================
// FLOW 1.2 - Fonction d'authentification qui communique avec le serveur
// ==========================================
// Cette fonction accepte uniquement l'email et le mot de passe
// Plus tard, on utilisera fetch pour envoyer les données au backend
// La fonction retourne une Promise :
// le résultat arrivera plus tard après la réponse du serveur
// ==========================================
export async function signIn(
    body: Omit<UserLogin, "id" | "role">,
): Promise<SignInResponse> {

    try {
        const { data } = await apiClient.post<SignInResponse>(`/auth/login`, body);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function logout(): Promise<void> {

    try{
        const { data } = await apiClient.post(`/auth/logout`);
    return data;
    }catch (error) {
        console.log(error)
        throw error
    }
    
}

// export async function getPostById(id: number): Promise<User> {
//     const { data } = await axios.get<User>(`${API_URL}/posts/${id}`);
//     return data;
// }

// export async function createPost(post: Omit<User, "id">): Promise<User> {
//     const { data } = await axios.post<User>(`${API_URL}/posts`, post);
//     return data;
// }
