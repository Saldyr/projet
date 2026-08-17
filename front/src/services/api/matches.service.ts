import apiClient from "./apiClient";
import type {
    CreateMatchPayload,
    MatchItem,
    UpdateMatchPayload,
} from "../../types";

// Récupère la liste des matchs depuis l'API.
export async function getMatches(): Promise<MatchItem[]> {
    const { data } = await apiClient.get<MatchItem[]>("/matches");
    return data;
}

// Récupère un match par son identifiant.
export async function getMatch(matchId: number): Promise<MatchItem> {
    const { data } = await apiClient.get<MatchItem>(`/matches/${matchId}`);
    return data;
}

// Envoie un nouveau match au back avec le payload attendu par POST /matches.
export async function createMatch(
    body: CreateMatchPayload,
): Promise<MatchItem> {
    const { data } = await apiClient.post<MatchItem>("/matches", body);
    return data;
}

// Met a jour un match existant via PATCH /matches/:id.
export async function updateMatch(
    matchId: number,
    body: UpdateMatchPayload,
): Promise<void> {
    await apiClient.patch(`/matches/${matchId}`, body);
}

// Supprime un match via DELETE /matches/:id.
export async function deleteMatch(matchId: number): Promise<void> {
    await apiClient.delete(`/matches/${matchId}`);
}
