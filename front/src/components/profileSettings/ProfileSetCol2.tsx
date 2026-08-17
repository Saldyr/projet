import { DeleteAccZone } from "./DeleteAccZone";
import { ProfileSetForm } from "./ProfileSetForm";

export const ProfileSetCol2 = () => {
    return (
        <div className="flex-1">
            <ProfileSetForm />
            <DeleteAccZone />
        </div>
    );
};
