import { Link } from "react-router-dom";
import {
    MatchCard,
    MatchListFeedback,
    MatchOwnerActions,
    MatchPageShell,
    isMatchOwner,
    matchRoutes,
    matchToCardProps,
} from "../components/matchs";
import { mockMatchClubs } from "../data/mockMatchClubs";
import { useGetMatches } from "../hooks/useMatches";
import useAuthStore from "../stores/auth.store";

const MatchsPage = () => {
    const { data: matches = [], isLoading, isError } = useGetMatches();
    const currentUserId = useAuthStore((state) => state.user?.id);

    const showListFeedback = isLoading || isError || matches.length === 0;

    return (
        <MatchPageShell
            title="Matchs"
            subtitle="Consulte l ensemble des rencontres programmees et retrouve rapidement les informations essentielles du calendrier."
            action={
                <Link to={matchRoutes.create} className="btn btn-primary">
                    Creer un nouveau match
                </Link>
            }
        >
            <div className="mt-6 grid gap-6 lg:mt-10 lg:grid-cols-2 xl:grid-cols-3">
                {showListFeedback && (
                    <div className="lg:col-span-2 xl:col-span-3">
                        <MatchListFeedback
                            isLoading={isLoading}
                            isError={isError}
                            isEmpty={!isLoading && !isError && matches.length === 0}
                        />
                    </div>
                )}

                {!isLoading &&
                    !isError &&
                    matches.map((match) => (
                        <MatchCard
                            key={match.id}
                            {...matchToCardProps(match, mockMatchClubs)}
                            showCreateButton={false}
                            ownerActions={
                                isMatchOwner(match, currentUserId) ? (
                                    <MatchOwnerActions matchId={match.id} />
                                ) : undefined
                            }
                        />
                    ))}
            </div>
        </MatchPageShell>
    );
};

export default MatchsPage;
