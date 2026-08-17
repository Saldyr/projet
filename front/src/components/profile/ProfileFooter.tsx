import { BiLogOut } from "react-icons/bi";
import type { UserInfos } from "../../types/user.type";
import { useSignOut } from "../../hooks/useAuth";



export const ProfileFooter = ({id}: Pick<UserInfos, 'id'>) => {

    const signOut= useSignOut()

    return (
        <div className="mt-12 flex flex-col items-center gap-4">
            <button onClick={signOut} className="btn btn-ghost text-error gap-2 hover:bg-error/10">
                <BiLogOut size={20} />
                Déconnexion
            </button>
            <p className="text-[10px] uppercase tracking-widest opacity-30">
                ID Utilisateur : #{id}
            </p>
        </div>
    );
};
