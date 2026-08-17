import { formatDateFr } from "../../common/utils/date.utils";
import {
    ProfileFooter,
    ProfileHeader,
    ProfileStats,
    ProfileTabs,
} from "../../components";
import { useGetProfile } from "../../hooks/useProfile";
import { getUserProfileFakers } from "./Profile.faker";

export const ProfilePage = () => {
    const { data, isLoading, isError } = useGetProfile();

    const memberSince = (data?.createdAt) && formatDateFr(data.createdAt);
    
    //Utilise un faker en attente de certaines données non dispo pour le moment 
    //En attente Clubs, Matchs, Calendrier etc
    const faker = getUserProfileFakers();

    if (isLoading) {
        return (
            <div className="bg-base-100 min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary" />
            </div>
        );
    }

    if (isError) {
        console.log("les informations profile", data);
        return (
            <div className="bg-base-100 min-h-screen flex items-center justify-center">
                <p className="text-error font-semibold">
                    Impossible de charger le profil. Veuillez réessayer.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-base-100 min-h-screen pt-10 md:pt-20 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <ProfileHeader
                    user={data}
                    userRole={faker?.datas.userRole}
                    memberSince={memberSince}
                />
                <ProfileStats
                    userRole={faker?.datas.userRole}
                    clubTotalMatches={faker?.datas.clubTotalMatches}
                    clubFollowers={faker?.datas.clubFollowers}
                />
                <ProfileTabs
                    userRole={faker?.datas.userRole}
                    userClub={faker?.datas.userClub}
                    userFavClubs={faker?.datas.userFavClubs}
                />
                <ProfileFooter id={data!.id} />
            </div>
        </div>
    );
};
