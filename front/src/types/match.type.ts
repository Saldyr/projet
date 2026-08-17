import type { ReactNode } from "react";

export interface MatchClubOption {
    id: number;
    name: string;
    acronym?: string;
}

export interface MatchItem {
    id: number;
    userId: number;
    clubHomeId: number;
    clubAwayId: number;
    startDate: string;
    endDate: string;
    matchAddress: string;
    scoreTeamHome?: number | null;
    scoreTeamAway?: number | null;
    clubHomeName?: string;
    clubAwayName?: string;
}

export interface MatchPreview {
    clubHomeName: string;
    clubAwayName: string;
    startDate: string;
    endDate: string;
    matchAddress: string;
    scoreTeamHome?: number;
    scoreTeamAway?: number;
}

export interface CreateMatchPayload {
    clubHomeId: number;
    clubAwayId: number;
    startDate: string;
    endDate: string;
    matchAddress: string;
    scoreTeamHome?: number;
    scoreTeamAway?: number;
}

export type UpdateMatchPayload = CreateMatchPayload;

export interface CreateMatchFormValues {
    clubHomeId: string;
    clubAwayId: string;
    startDate: string;
    endDate: string;
    matchAddress: string;
    scoreTeamHome?: string;
    scoreTeamAway?: string;
}

export type MatchCardProps = {
    date: string;
    leftTeamName: string;
    rightTeamName: string;
    time: string;
    venue: string;
    isHome?: boolean;
    showCreateButton?: boolean;
    ownerActions?: ReactNode;
};
