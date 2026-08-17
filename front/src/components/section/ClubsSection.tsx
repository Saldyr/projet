import ButtonLike from "../ui/ButtonLike";
import SectionCard from "../ui/SectionCard";
import type { ClubSectionProps } from "../../types";
import {
    interactivePanelClassName,
    softPanelClassName,
} from "../../styles/uiClasses";

const ClubsSection = ({
    title = "Clubs favoris",
    clubs = [
        {
            clubName: "Sportify FC",
            clubSubtitle: "Ligue 1",
        },
        {
            clubName: "Olympique Demo",
            clubSubtitle: "Premier League",
        },
    ],
    emptyMessage = "Aucun club favori pour le moment.",
}: ClubSectionProps) => {
    return (
        <SectionCard
            sectionClassName="w-full max-w-md self-center lg:w-2/5 lg:max-w-none lg:self-auto"
            cardClassName="w-full card-xs lg:card-xl"
            bodyClassName="lg:p-8"
        >
            <div className="space-y-1 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                    Favoris
                </p>
                <h2 className="card-title text-left text-xl">{title}</h2>
            </div>

            {clubs.length > 0 ? (
                <ul className="mt-4 space-y-4">
                    {clubs.map((club, index) => (
                        <li
                            key={`${club.clubName}-${club.clubSubtitle}-${index}`}
                            className={`${softPanelClassName} ${interactivePanelClassName} flex items-start justify-between gap-4 rounded-2xl px-4 py-3`}
                        >
                            <div className="min-w-0 text-left">
                                <p className="truncate text-base font-semibold text-base-content">
                                    {club.clubName}
                                </p>
                                <p className="mt-1 text-sm text-base-content/70">
                                    {club.clubSubtitle}
                                </p>
                            </div>
                            <ButtonLike />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 text-left text-sm text-base-content/70">
                    {emptyMessage}
                </p>
            )}
        </SectionCard>
    )
}

export default ClubsSection;