import type {
    CreateMatchFormValues,
    CreateMatchPayload,
    MatchClubOption,
    MatchItem,
    MatchPreview,
} from "../../types";

export const EMPTY_MATCH_FORM_VALUES: CreateMatchFormValues = {
    clubHomeId: "",
    clubAwayId: "",
    startDate: "",
    endDate: "",
    matchAddress: "",
    scoreTeamHome: "",
    scoreTeamAway: "",
};

export function toOptionalScore(value?: string): number | undefined {
    if (!value || value.trim() === "") return undefined;
    return Number(value);
}

export function toIsoDateTime(value: string): string {
    return new Date(value).toISOString();
}

export function toDatetimeLocalValue(isoDate: string): string {
    const date = new Date(isoDate);

    if (Number.isNaN(date.getTime())) return "";

    const pad = (value: number) => String(value).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function matchItemToFormValues(match: MatchItem): CreateMatchFormValues {
    return {
        clubHomeId: String(match.clubHomeId),
        clubAwayId: String(match.clubAwayId),
        startDate: toDatetimeLocalValue(match.startDate),
        endDate: toDatetimeLocalValue(match.endDate),
        matchAddress: match.matchAddress,
        scoreTeamHome:
            match.scoreTeamHome != null ? String(match.scoreTeamHome) : "",
        scoreTeamAway:
            match.scoreTeamAway != null ? String(match.scoreTeamAway) : "",
    };
}

export function getClubNameById(
    clubId: string,
    clubOptions: MatchClubOption[],
): string {
    return (
        clubOptions.find((club) => String(club.id) === clubId)?.name ??
        "Club inconnu"
    );
}

export function buildMatchPreview(
    data: CreateMatchFormValues,
    clubOptions: MatchClubOption[],
): MatchPreview {
    return {
        clubHomeName: getClubNameById(data.clubHomeId, clubOptions),
        clubAwayName: getClubNameById(data.clubAwayId, clubOptions),
        startDate: data.startDate,
        endDate: data.endDate,
        matchAddress: data.matchAddress.trim(),
        scoreTeamHome: toOptionalScore(data.scoreTeamHome),
        scoreTeamAway: toOptionalScore(data.scoreTeamAway),
    };
}

export function buildMatchPayload(
    data: CreateMatchFormValues,
): CreateMatchPayload {
    return {
        clubHomeId: Number(data.clubHomeId),
        clubAwayId: Number(data.clubAwayId),
        startDate: toIsoDateTime(data.startDate),
        endDate: toIsoDateTime(data.endDate),
        matchAddress: data.matchAddress.trim(),
        scoreTeamHome: toOptionalScore(data.scoreTeamHome),
        scoreTeamAway: toOptionalScore(data.scoreTeamAway),
    };
}
