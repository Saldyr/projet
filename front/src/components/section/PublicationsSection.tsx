import type { PublicationsSectionProps } from "../../types";
import SectionCard from "../ui/SectionCard";
import {
    interactivePanelClassName,
    softPanelClassName,
} from "../../styles/uiClasses";

const PublicationsSection = ({
    title = "Nouvelles publications",
    articles = [
        {
            clubName: "Sportify FC",
            articleTitle: "Le groupe pour le prochain match a ete devoile",
        },
        {
            clubName: "Olympique Demo",
            articleTitle: "Retour sur la derniere seance d'entrainement",
        },
        {
            clubName: "Racing Example",
            articleTitle: "Le coach presente les objectifs de la semaine",
        },
    ],
    emptyMessage = "Aucun article recent pour le moment.",
}: PublicationsSectionProps) => {
    return (
        <SectionCard
            sectionClassName="w-full max-w-md self-center lg:max-w-none lg:self-auto"
            cardClassName="w-full card-xs lg:card-normal"
            bodyClassName="text-left lg:p-8"
        >
            <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                    Fil d'actualite
                </p>
                <h2 className="card-title text-xl">{title}</h2>
            </div>
            {articles.length > 0 ? (
                <ul className="mt-4 space-y-4">
                    {articles.map((article, index) => (
                        <li
                            key={`${article.clubName}-${article.articleTitle}-${index}`}
                            className={`${softPanelClassName} ${interactivePanelClassName} rounded-2xl px-4 py-3`}
                        >
                            <p className="text-sm font-semibold text-primary">
                                {article.clubName}
                            </p>
                            <p className="mt-1 text-sm text-base-content/80">
                                {article.articleTitle}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 text-sm text-base-content/70">{emptyMessage}</p>
            )}
        </SectionCard>
    );
};

export default PublicationsSection;
