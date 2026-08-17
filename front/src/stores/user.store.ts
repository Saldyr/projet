import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../types/user.type";

// ==========================================
// Store Zustand — Utilisateur connecté
// Persiste dans localStorage pour survivre au refresh
// ==========================================

interface UserStore {
    user: AuthUser | null;
    token: string | null;

    // Actions
    setUser: (user: AuthUser) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,

            setUser: (user) => set({ user }),

            setToken: (token) => set({ token }),

            logout: () => set({ user: null, token: null }),
        }),
        {
            name: "auth-storage", // clé dans localStorage
        }
    )
);

// ==========================================
// Sélecteurs pratiques
// ==========================================

//On évite d'importer tout le store d'un coup seulement ce qui nous intéresse 
export const useCurrentUserId = () => useUserStore((s) => s.user?.id);
export const useCurrentUser = () => useUserStore((s) => s.user);
export const useIsLoggedIn = () => useUserStore((s) => !!s.user && !!s.token);
export const useLogOutUser = () => useUserStore((s) => s.logout);