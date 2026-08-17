import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseMutationResult,
} from "@tanstack/react-query";

import {
    createMatch,
    deleteMatch,
    getMatch,
    getMatches,
    updateMatch,
} from "../services/api/matches.service";

import type {
    CreateMatchPayload,
    MatchItem,
    UpdateMatchPayload,
} from "../types";

// ==========================================
// Clés de cache TanStack Query
// ==========================================

export const matchKeys = {
    all: ["matches"] as const,
    lists: () => ["matches", "list"] as const,
    detail: (matchId: number) => ["matches", matchId] as const,
};

// ==========================================
// useGetMatches — GET /matches
// ==========================================

export function useGetMatches() {
    return useQuery({
        queryKey: matchKeys.lists(),
        queryFn: () => getMatches(),
        staleTime: 1000 * 60 * 5,
    });
}

// ==========================================
// useGetMatch — GET /matches/:id
// ==========================================

export function useGetMatch(matchId: number) {
    return useQuery({
        queryKey: matchKeys.detail(matchId),
        queryFn: () => getMatch(matchId),
        enabled: Number.isFinite(matchId) && matchId > 0,
        staleTime: 1000 * 60 * 5,
    });
}

// ==========================================
// useCreateMatch — POST /matches
// ==========================================

export function useCreateMatch(): UseMutationResult<
    MatchItem,
    Error,
    CreateMatchPayload
> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => createMatch(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: matchKeys.all,
            });
        },
    });
}

// ==========================================
// useUpdateMatch — PATCH /matches/:id
// ==========================================

export function useUpdateMatch(
    matchId: number,
): UseMutationResult<void, Error, UpdateMatchPayload> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => updateMatch(matchId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: matchKeys.all,
            });
        },
    });
}

// ==========================================
// useDeleteMatch — DELETE /matches/:id
// ==========================================

export function useDeleteMatch(): UseMutationResult<void, Error, number> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (matchId) => deleteMatch(matchId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: matchKeys.all,
            });
        },
    });
}