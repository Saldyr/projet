import { glassSurfaceClassName, softPanelClassName } from "../../styles/uiClasses";
import type { MatchPreview } from "../../types";

type MatchPreviewCardProps = {
    matchPreview: MatchPreview | null; // données préparées depuis le formulaire
};

const MatchPreviewCard = ({ matchPreview }: MatchPreviewCardProps) => {
    return (
        <aside className={`${glassSurfaceClassName} card rounded-4xl shadow-sm`}>
            <div className="card-body p-6 text-left lg:p-8">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                        Apercu
                    </p>
                    <h2 className="card-title text-xl">Resume du match</h2>
                    <p className="text-sm text-base-content/70">
                        Verifie les informations principales de la rencontre
                        avant validation.
                    </p>
                </div>

                {/* Si un match a déjà été saisi, on affiche un résumé visuel. */}
                {matchPreview ? (
                    <div className={`${softPanelClassName} mt-5 space-y-4 rounded-2xl p-4`}>
                        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-3">
                            <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-base-content">
                                    {matchPreview.clubHomeName}
                                </p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                    Domicile
                                </p>
                            </div>

                            <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
                                VS
                            </div>

                            <div className="min-w-0 text-right">
                                <p className="truncate text-base font-semibold text-base-content">
                                    {matchPreview.clubAwayName}
                                </p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                    Exterieur
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 border-t border-base-300/60 pt-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">
                                    Debut
                                </p>
                                <p className="mt-1 text-sm text-base-content/80">
                                    {matchPreview.startDate || "Non renseigne"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">
                                    Fin
                                </p>
                                <p className="mt-1 text-sm text-base-content/80">
                                    {matchPreview.endDate || "Non renseigne"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">
                                    Lieu
                                </p>
                                <p className="mt-1 text-sm text-base-content/80">
                                    {matchPreview.matchAddress}
                                </p>
                            </div>

                            {(matchPreview.scoreTeamHome !== undefined ||
                                matchPreview.scoreTeamAway !== undefined) && (
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">
                                        Score previsionnel
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-base-content">
                                        {matchPreview.scoreTeamHome ?? 0} - {matchPreview.scoreTeamAway ?? 0}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Sinon on garde un état vide plus explicite pour guider l'utilisateur.
                    <div className={`${softPanelClassName} mt-5 rounded-2xl p-4`}>
                        <p className="text-sm text-base-content/60">
                            Remplis le formulaire pour afficher ici un resume
                            clair de la rencontre.
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default MatchPreviewCard;
