import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { signIn, signUp, type SignInResponse, type SignUpResponse } from "../services/api/auth.service";
import type { UserLogin, UserRegister } from "../types/user.type";
import useAuthStore from "../stores/auth.store";
import { useNavigate } from "react-router-dom";


export function useSignUp(): UseMutationResult<
    SignUpResponse, // ceci est la réponse renvoyé par l'API, on ne veut pas le password dans la réponse
    Error, // type de l'erreur
    Omit<UserRegister, "id"> // ceci est l'envoi attendu par l'API, on ne veut pas l'id dans la requête
> {
    
    return useMutation({
        mutationFn: (payload) => signUp(payload), // 1.2 mutation fonction de signUp dans user.api.ts, l'appel HTTP
        onSuccess: () => {
            console.log("Succès");
        },
    });
}


// ==========================================
// FLOW 1.3 - Hook personnalisé React pour gérer la connexion utilisateur
// ==========================================
// Ce hook centralise toute la logique de connexion
//  Il utilise TanStack Query pour gérer :
// - l'appel async au serveur
// - les états loading / success / error
// - la gestion des réponses
export function useSignIn(): UseMutationResult< // Type de résultat possible pour useMutation
    SignInResponse, // Réponse en cas de succès
    Error, // Réponse en cas d'erreur
    Omit<UserLogin, "id" | "role"> // Type de payload envoyé
> {
    return useMutation({ // est utilisé pour les actions qui modifient des données (login, register, create, update, delete...)
        mutationFn: (payload) => signIn(payload), //mutationFn = fonction appelée automatiquement quand on lance la connexion
        // Elle reçoit les données du formulaire (email, password)
        // puis appelle la fonction signIn qui communique avec le serveur
        onSuccess: () => { // onSuccess se déclenche automatiquement lorsque la connexion réussit
            console.log("Succès");
        },
    });
}


// ==========================================
// Hook personnalisé déconnexion ==> pour le bouton
// ==========================================

export function useSignOut(): () => void {
    // on récupère la fonction clearAuth dans le hook useAuthStore en lui passant la props state
    const clearAuth = useAuthStore((state) => state.clearAuth) // On va nettoyer le user et accesstoken dans le localstorage avec persist() en remettant à null
    const navigate = useNavigate() // Puis utiliser useNavigate pour rédirigé de React Router
    return () => { 
        clearAuth()
        navigate("/signin")
    }
    // on retourne un fonction qui nettoie le local storage et qui redirige vers signin
}