import { ProfileSetHeader, ProfileSetZone } from "../../components";

export const ProfileEditPage = () => {

    return (
        <div className="bg-base-100 min-h-screen flex flex-col items-center pt-10 md:pt-20 px-4">
            <div className="w-full max-w-md md:max-w-3xl">
                <ProfileSetHeader/>
                <ProfileSetZone/>
            </div>
        </div>
    );
};