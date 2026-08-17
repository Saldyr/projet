import { Avatar } from "../Avatar";
import type { IProfileProps } from "../../types";
import { Link } from "react-router-dom"
import { BiSolidPencil } from "react-icons/bi";


export const ProfileHeader = ({user, userRole, memberSince}: IProfileProps) => {

    const userFullName =
        (user && user.firstName && user.lastName)
        ? `${user.firstName} ${user.lastName}`
        : 'Utilisateur n\'existe pas'
    ;

    return (
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 relative">
            <Avatar size="w-full max-w-md"/>
            <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h1 className="text-3xl md:text-5xl font-extrabold">
                        {userFullName}
                    </h1>
                    {userRole && (
                        <span className="badge badge-secondary badge-outline uppercase text-[10px] font-bold mx-auto md:mx-0">
                            {userRole}
                        </span>
                    )}
                </div>
                <p className="text-base-content/60 font-medium">
                    {(user && user.email)}
                </p>
                <p className="text-xs opacity-40">
                    Membre depuis le <b>{memberSince}</b>
                </p>
            </div>

            {/*Bouton Edit repositionné pour le look "Header"*/}
            <Link
                to="/profile/settings"
                className="btn btn-primary btn-sm md:btn-md gap-2 shadow-lg"
            >
                <BiSolidPencil/> Modifier
            </Link>
        </div>
    );
};
