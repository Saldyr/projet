import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    MatchEditForm,
    MatchFormPageLayout,
    MatchPageShell,
    MatchPreviewCard,
    matchItemToFormValues,
    isMatchOwner,
    matchRoutes,
    parseMatchId,
} from "../components/matchs";
import { mockMatchClubs } from "../data/mockMatchClubs";
import { useGetMatch } from "../hooks/useMatches";
import useAuthStore from "../stores/auth.store";
import type { MatchPreview } from "../types";

const MatchsEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const matchId = parseMatchId(id);
    const currentUserId = useAuthStore((state) => state.user?.id);
    const { data: match, isLoading, isError } = useGetMatch(matchId ?? 0);
    const [matchPreview, setMatchPreview] = useState<MatchPreview | null>(null);

    const initialValues = useMemo(
        () => (match ? matchItemToFormValues(match) : undefined),
        [match],
    );

    const isOwner = match ? isMatchOwner(match, currentUserId) : false;

    if (!matchId) {
        return (
            <section className="mx-auto w-full max-w-7xl px-4 py-10 text-center">
                <p className="text-error">Identifiant de match invalide.</p>
                <Link to={matchRoutes.list} className="btn btn-ghost mt-4">
                    Retour aux matchs
                </Link>
            </section>
        );
    }

    return (
        <MatchPageShell
            title="Modifier un match"
            subtitle="Mets a jour les informations de la rencontre que tu as creee."
        >
            {isLoading && (
                <p className="mt-6 text-sm text-base-content/70">
                    Chargement du match...
                </p>
            )}

            {isError && (
                <div className="mt-6 space-y-4">
                    <p className="text-sm text-error">
                        Impossible de recuperer ce match.
                    </p>
                    <Link to={matchRoutes.list} className="btn btn-ghost">
                        Retour aux matchs
                    </Link>
                </div>
            )}

            {!isLoading && !isError && match && !isOwner && (
                <div className="mt-6 space-y-4">
                    <p className="text-sm text-error">
                        Tu ne peux modifier que les matchs que tu as crees.
                    </p>
                    <Link to={matchRoutes.list} className="btn btn-ghost">
                        Retour aux matchs
                    </Link>
                </div>
            )}

            {!isLoading && !isError && match && isOwner && initialValues && (
                <MatchFormPageLayout
                    form={
                        <MatchEditForm
                            matchId={match.id}
                            clubOptions={mockMatchClubs}
                            initialValues={initialValues}
                            onSubmitPreview={setMatchPreview}
                            onResetPreview={() => setMatchPreview(null)}
                            onSuccess={() => navigate(matchRoutes.list)}
                        />
                    }
                    preview={<MatchPreviewCard matchPreview={matchPreview} />}
                />
            )}
        </MatchPageShell>
    );
};

export default MatchsEditPage;
