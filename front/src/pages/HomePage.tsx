import ClubsSection from "../components/section/ClubsSection";
import { HomeMatchCard } from "../components/matchs";
import PublicationsSection from "../components/section/PublicationsSection";
import {
    eyebrowClassName,
    pageSubtitleClassName,
    pageTitleClassName,
} from "../styles/uiClasses";

export default function HomePage() {
    return (
        <section className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-10 lg:px-6 lg:py-14 xl:px-8">
            <div className="w-full text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-5">
                    <span className={eyebrowClassName}>Dashboard sport</span>
                </div>
                <h1 className={`${pageTitleClassName} text-4xl font-extrabold sm:text-5xl`}>
                    Accueil
                </h1>
                <p className={`${pageSubtitleClassName} mx-auto mt-3 max-w-2xl text-base md:text-lg lg:mx-0`}>
                    Bienvenue sur Sportify, ton tableau de bord sport au style plus moderne et plus lisible.
                </p>

                <div className="mt-6 hidden lg:mt-10 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="flex w-3/5 flex-col gap-8 xl:gap-10">
                        <PublicationsSection />
                        <HomeMatchCard />
                    </div>
                    <ClubsSection />
                </div>
                <div className="mt-6 flex flex-col items-stretch gap-6 lg:hidden">
                    <PublicationsSection />
                    <HomeMatchCard />
                    <ClubsSection />
                </div>
            </div>
        </section>
    );
}