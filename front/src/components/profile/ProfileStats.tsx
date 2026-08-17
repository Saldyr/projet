import type { IProfileProps } from "../../types";


export const ProfileStats = ({userRole, clubFollowers, clubTotalMatches}:IProfileProps) => {

    return (
        <>
            {userRole && (
                <div className="stats shadow bg-base-200 w-full mt-10 grid-cols-2 overflow-hidden">
                    {" "}
                    {/*Ajouter grid-cols-3 pour V2*/}
                    <div className="stat place-items-center p-3">
                        <div className="stat-title text-[10px] md:text-xs uppercase font-bold">
                            Matchs
                        </div>
                        <div className="stat-value text-xl md:text-3xl text-primary">
                            {clubTotalMatches}
                        </div>
                    </div>
                    <div className="stat place-items-center p-3 border-l border-base-300">
                        <div 
                            className="tooltip tooltip-primary tooltip-top stat-title text-[10px] md:text-xs uppercase font-bold"
                            data-tip="Nombre de Followers au club géré"
                        >
                            Abonnés
                        </div>
                        <div className="stat-value text-xl md:text-3xl">
                            {clubFollowers}
                        </div>
                    </div>
                    {/* Voir pour une possible V2 */}
                    {/*
                        <div className="stat place-items-center p-3 border-l border-base-300">
                        <div className="stat-title text-[10px] md:text-xs uppercase font-bold">Rang</div>
                        <div className="stat-value text-xl md:text-3xl text-secondary">{user.stats.rank}</div>
                        </div>
                        */}
                </div>
            )}
        </>
    );
};
