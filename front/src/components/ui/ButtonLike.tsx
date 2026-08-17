import { FaHeart } from "react-icons/fa";
import type { ButtonLikeProps } from "../../types";
import { glassSurfaceClassName } from "../../styles/uiClasses";

const ButtonLike = ({
    className = "",
    ariaLabel = "Ajouter aux favoris",
}: ButtonLikeProps) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            className={`${glassSurfaceClassName} flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-base-200 ${className}`.trim()}
        >
            <FaHeart className="size-[1.2em] text-primary" />
        </button>
    );
};

export default ButtonLike;
