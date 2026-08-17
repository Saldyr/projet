import { Link } from "react-router-dom";
import type { MatchCardProps } from "../../types";
import SectionCard from "../ui/SectionCard";
import { softPanelClassName } from "../../styles/uiClasses";
import { matchRoutes } from "./match.utils";

const MatchCard = ({
    date,
    leftTeamName,
    rightTeamName,
    time,
    venue,
    isHome = true,
    showCreateButton = false,
    ownerActions,
}: MatchCardProps) => {
    const leftSideLabel = isHome ? "Home" : "Away";
    const rightSideLabel = isHome ? "Away" : "Home";

    return (
        <SectionCard
            sectionClassName="w-full max-w-md self-center lg:max-w-none lg:self-auto"
            cardClassName="w-full card-xs lg:card-normal"
            bodyClassName="text-left lg:p-8"
        >
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                    Prochain match
                </p>
                <p className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
                    {date}
                </p>
            </div>

            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-3 lg:gap-4">
                <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-base-content lg:text-lg">
                        {leftTeamName}
                    </h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {leftSideLabel}
                    </p>
                </div>

                <div
                    className={`${softPanelClassName} rounded-full px-3 py-1.5 text-sm font-semibold text-primary shadow-sm lg:px-4 lg:py-2`}
                >
                    {time}
                </div>

                <div className="min-w-0 text-right">
                    <h2 className="truncate text-base font-semibold text-base-content lg:text-lg">
                        {rightTeamName}
                    </h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {rightSideLabel}
                    </p>
                </div>
            </div>

            <div className="mt-5 border-t border-base-300/60 pt-4 lg:mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-base-content/50">
                    Lieu
                </p>
                <p className="mt-2 text-sm text-base-content/70">{venue}</p>

                {(showCreateButton || ownerActions) && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {showCreateButton && (
                            <Link
                                to={matchRoutes.create}
                                className="btn btn-primary btn-sm"
                            >
                                Creer un nouveau match
                            </Link>
                        )}
                        {ownerActions}
                    </div>
                )}
            </div>
        </SectionCard>
    );
};

export default MatchCard;
