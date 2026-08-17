import type { AxiosInstance } from "axios";
import axios from "axios";
import useAuthStore from "../../stores/auth.store";

// Définir les interfaces pour la structure de la réponse attendue
interface TokenData {
    access_token: string;
    refresh_token: string;
}

interface RefreshTokenResponse {
    data: {
        data: TokenData;
    };
}

// Contrôle de type permettant de vérifier la structure de la réponse
function isRefreshTokenResponse(
    response: any,
): response is RefreshTokenResponse {
    return (
        response &&
        response.data &&
        response.data.data &&
        typeof response.data.data.access_token === "string" &&
        typeof response.data.data.refresh_token === "string"
    );
}

export async function refreshToken(refresh_token: string) {
    const headers = { Authorization: "Bearer " + refresh_token };
    const apiRefresh: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers,
    });

    try {
        const response = await apiRefresh.post(`/auth/refresh_token`);
        return response;
    } catch (error) {
        console.error("Erreur:", error);
    }
}

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    //lecture dans le localStorage sans le store Zustand 
    //const token = localStorage.getItem("accessToken");
    //Ici on cherche l'accessToken à la racine ce qui donne => null 

    //Lecture depuis le store Zustand
    const token = useAuthStore.getState().accessToken;

    /* Avec Zustand */
    //Le store est sauvegardé dans localStorage mais dans une structure imbriqué défini tel quel :
    /* 
        localStorage
            "auth-storage" → { state: { accessToken: "eyJ...", user: {...} }, version: 0 }
    */

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;

            if (!originalRequest._retry) {
                originalRequest._retry = true;
            } else return Promise.reject(error);

            const refresh_token = localStorage.getItem("refresh_token");

            if (refresh_token) {
                try {
                    const result = await refreshToken(refresh_token);

                    if (isRefreshTokenResponse(result)) {
                        const {
                            access_token,
                            refresh_token: new_refresh_token,
                        } = result.data.data;

                        localStorage.setItem("accessToken", access_token);
                        localStorage.setItem(
                            "refresh_token",
                            new_refresh_token,
                        );

                        // originalRequest.headers[
                        //   "Authorization"
                        // ] = `Bearer ${access_token}`;

                        return apiClient(originalRequest);
                    } else {
                        throw new Error("Invalid refresh token response");
                    }
                } catch (error) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refresh_token");
                    return Promise.reject(error);
                }
            } else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refresh_token");
            }
        }

        if (error.response && error.response.status === 500) {
            location.href = "/";
        }

        return Promise.reject(error);
    },
);

export default apiClient;
