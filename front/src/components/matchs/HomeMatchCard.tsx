import { Link } from "react-router-dom";
import { mockMatchClubs } from "../../data/mockMatchClubs";
import { useGetMatches } from "../../hooks/useMatches";
import useAuthStore from "../../stores/auth.store";
import SectionCard from "../ui/SectionCard";
import MatchCard from "./MatchCard";
import MatchOwnerActions from "./MatchOwnerActions";
import { isMatchOwner, matchRoutes, matchToCardProps } from "./match.utils";

const homeMatchCardLayout = {
    sectionClassName: "w-full max-w-md self-center lg:max-w-none lg:self-auto",
    cardClassName: "w-full card-xs lg:card-normal",
    bodyClassName: "text-left lg:p-8",
} as const;

const HomeMatchCard = () => {
    const { data: matches = [], isLoading, isError } = useGetMatches();
    const currentUserId = useAuthStore((state) => state.user?.id);
    const featuredMatch = matches[0];

    if (isLoading) {
        return (
            <SectionCard {...homeMatchCardLayout}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                    Prochain match
                </p>
                <p className="mt-4 text-sm text-base-content/70">
                    Chargement du prochain match...
                </p>
            </SectionCard>
        );
    }

    if (isError) {
        return (
            <SectionCard {...homeMatchCardLayout}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                    Prochain match
                </p>
                <p className="mt-4 text-sm text-error">
                    Impossible de recuperer les matchs.
                </p>
                <Link to={matchRoutes.list} className="btn btn-ghost btn-sm mt-4">
                    Voir le calendrier
                </Link>
            </SectionCard>
        );
    }

    if (!featuredMatch) {
        return (
            <SectionCard {...homeMatchCardLayout}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                    Prochain match
                </p>
                <p className="mt-4 text-sm text-base-content/70">
                    Aucun match n est encore programme.
                </p>
                <Link
                    to={matchRoutes.create}
                    className="btn btn-primary btn-sm mt-4"
                >
                    Creer un match
                </Link>
            </SectionCard>
        );
    }

    return (
        <MatchCard
            {...matchToCardProps(featuredMatch, mockMatchClubs)}
            showCreateButton
            ownerActions={
                isMatchOwner(featuredMatch, currentUserId) ? (
                    <MatchOwnerActions matchId={featuredMatch.id} />
                ) : undefined
            }
        />
    );
};

export default HomeMatchCard;
