
import { ProfileSetAvatar, ProfileSetCol2 } from "..";

export const ProfileSetZone = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            {/* COLONNE GAUCHE */}
            <ProfileSetAvatar />

            {/* COLONNE DROITE */}
            <ProfileSetCol2 />
        </div>
    );
};
