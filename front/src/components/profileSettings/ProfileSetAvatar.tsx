import { Avatar } from ".."
import { BiSolidPencil } from "react-icons/bi"

export const ProfileSetAvatar = () => {

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
                <Avatar size="w-32 md:w-50"/>
                {/* Bouton de modification de photo */}
                <button
                    className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
                    title="Changer la photo"
                >
                    <BiSolidPencil size={18} />
                </button>
            </div>
            <p className="text-xs text-base-content/50 italic">
                Format JPG ou PNG recommandé
            </p>
        </div>
    );
};
