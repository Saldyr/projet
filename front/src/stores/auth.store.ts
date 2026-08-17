import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserLogin } from "../types/user.type";

type AuthState = {
    user: Omit<UserLogin, "password"> | null;
    accessToken: string | null;
    setUser: (user: Omit<UserLogin, "password"> | null) => void;
    setAccessToken: (token: string | null) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            setUser: (user) => set({ user }),
            setAccessToken: (token) => set({ accessToken: token }),
            clearAuth: () => set({ user: null, accessToken: null }),
        }),
        {
            name: "auth-storage",
        },
    ),
);

export default useAuthStore;
