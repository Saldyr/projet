import type { IProfileProps } from "../../types";
import { Link } from "react-router-dom";
import { BiFootball, /*BiHistory*/ } from "react-icons/bi";

export const ProfileTabs = ({userRole, userClub, userFavClubs}:IProfileProps) => {
    return (
        <div role="tablist" className="tabs tabs-lifted tabs-lg mt-10">
            <input type="radio" name="my_tabs" role="tab" className="tab font-bold" aria-label="Infos" defaultChecked/>
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 space-y-8">
                {/* Club Géré */}
                <div>
                    <h3 className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-3">
                        <BiFootball size={18} /> Club Géré
                    </h3>
                    <div className="p-4 bg-base-200 rounded-xl border border-base-300 flex justify-between items-center">
                        {userRole ? (
                            <>
                                <span className="text-lg font-medium">
                                    {userClub}
                                </span>
                                {/* A VOIR POUR UNE PROCHAINE VERSION 
                                <span className="badge badge-success badge-sm">
                                    Actif
                                </span>
                                */}
                            </>
                        ) : (
                            "Aucun club géré"
                        )}
                    </div>
                </div>

                {/* Clubs Suivis */}
                <div>
                    <h3 className="text-primary tooltip tooltip-primary tooltip-right font-bold uppercase text-xs tracking-widest mb-3" data-tip="Voir la Liste">
                        <Link to="">Clubs Suivis</Link>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {userFavClubs && userFavClubs.map((club) => (
                            <div
                                key={club}
                                className="badge badge-outline badge-lg py-5 px-6 hover:bg-base-200 cursor-pointer transition-colors"
                            >
                                {club}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* À Définir dans une prochaine version 
                    <input type="radio" name="my_tabs" role="tab" className="tab font-bold" aria-label="Activité"/>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <h3 className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-6">
                            <BiHistory size={18} /> Historique récent
                        </h3>
                        <ul className="steps steps-vertical">
                            <li className="step step-primary">
                                Score mis à jour (OM vs PSG)
                            </li>
                            <li className="step step-primary">
                                Nouveau joueur ajouté au Real Madrid
                            </li>
                            <li className="step">Profile mis à jour</li>
                            <li className="step">
                                Inscription au tournoi de Printemps
                            </li>
                        </ul>
                    </div>
                    */}
        </div>
    );
};
