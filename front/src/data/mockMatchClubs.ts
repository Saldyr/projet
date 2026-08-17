import type { MatchClubOption } from "../types";

// Données temporaires utilisées tant que les clubs ne sont pas encore
// récupérés depuis l'API côté front.
// IDs alignés sur les clubs réellement présents en base (GET /clubs/:id).
export const mockMatchClubs: MatchClubOption[] = [
    { id: 1, name: "Paris Eagles", acronym: "PEFC" },
    { id: 2, name: "Lyon Titans", acronym: "LTFC" },
];
