import type { MatchClubOption, MatchItem } from "../../types";
import { formatDateFr } from "../../common/utils/date.utils";

export const matchRoutes = {
    list: "/matchs",
    create: "/matchs/nouveau",
    edit: (matchId: number) => `/matchs/${matchId}/modifier`,
} as const;

export function parseMatchId(id: string | undefined): number | null {
    const matchId = Number(id);

    if (!Number.isFinite(matchId) || matchId <= 0) {
        return null;
    }

    return matchId;
}

export function isMatchOwner(
    match: MatchItem,
    userId?: number | null,
): boolean {
    return userId != null && match.userId === userId;
}

export function formatMatchTime(date: string): string {
    const dateObj = new Date(date);

    if (Number.isNaN(dateObj.getTime())) return "";

    return dateObj.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function getClubNameByNumericId(
    clubId: number,
    clubOptions: MatchClubOption[],
): string {
    return (
        clubOptions.find((club) => club.id === clubId)?.name ?? "Club inconnu"
    );
}

export function matchToCardProps(
    match: MatchItem,
    clubOptions: MatchClubOption[],
) {
    return {
        date: formatDateFr(match.startDate),
        leftTeamName: getClubNameByNumericId(match.clubHomeId, clubOptions),
        rightTeamName: getClubNameByNumericId(match.clubAwayId, clubOptions),
        time: formatMatchTime(match.startDate),
        venue: match.matchAddress,
        isHome: true as const,
    };
}
