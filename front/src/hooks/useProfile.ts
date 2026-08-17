import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfileInfos, updateUserProfile, deleteUserAccount } from "../services/api/profile.service";
import { useLogOutUser, useUserStore } from "../stores/user.store";
import type { UpdateProfileRequest } from "../types";
import { useNavigate } from "react-router-dom";

// ==========================================
// Clés de cache TanStack Query
// ==========================================
export const profileKeys = {
    all: ["profile"] as const, //clé générique pour tous les profils 
    //detail : clé spécifique pour le profil d'un user précis sert à rien pour le moment
    //On récupère l'id dans la requete et non l'url 
    //Inutile pour le user lui même mais très utile pour l'admin ou si on donne la 
    // possibilité aux users de consulter le profile d'autres users 
    //detail: (userId: number) => ["profile", userId] as const, 
};

// ==========================================
// useGetProfile — GET /users/profile
// ==========================================
export function useGetProfile() {
    //const userId = useCurrentUserId();

    return useQuery({
        queryKey: ["profile"], //profileKeys.detail(userId!),
        queryFn: () => getUserProfileInfos(), //getUserProfileInfos(userId!),
        //enabled: !!userId, // ne s'exécute pas si pas de userId
        staleTime: 1000 * 60 * 20, // 20 min en cache 
    });
}

// ==========================================    
// useUpdateProfile — PATCH /users/me
// ==========================================
export function useUpdateProfile() {
    const queryClient = useQueryClient(); //interaction avec cache TanStack
    //const userId = useCurrentUserId();
    //Recupération fonction update et etat du user depuis le store Zustand 
    const setUser = useUserStore((s) => s.setUser);
    const currentUser = useUserStore((s) => s.user);

    return useMutation({
        mutationFn: (payload: UpdateProfileRequest) =>
            updateUserProfile(payload),

        onSuccess: (_data, variables) => {
            // Met à jour le store Zustand avec les nouvelles infos
            if (currentUser) {
                setUser({
                    ...currentUser,
                    email: variables.email ?? currentUser.email,
                    firstName: variables.firstName ?? currentUser.firstName,
                    lastName: variables.lastName ?? currentUser.lastName,
                });
            }
            // Invalide le cache pour forcer un refetch du profil
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });
        },
    });
}

// ==========================================    
// useDeleUserAccount — DELETE /users/me
// ==========================================
export function useDeleteUserAccount() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logOut = useLogOutUser(); //Action de logout du store Zustand 

    return useMutation({
        mutationFn: deleteUserAccount,
        onSuccess: () => {
            //On vide le store => tout est mis à null (voir user.store.ts)
            logOut();

            //On vide TOUT le cache TanStack Query 
            //clear efface toutes les clés dans cache liés au user connecté
            queryClient.clear()

            navigate('/signin'); //redirection
        }
    })
}