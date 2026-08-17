import { NavLink } from "react-router";
import { FaFutbol, FaHeart, FaRegUserCircle } from "react-icons/fa";
import { HiHome, HiMiniNewspaper } from "react-icons/hi2";

const Navbar = () => {
    const dockItemClassName = ({ isActive }: { isActive: boolean }) =>
        `transition-colors duration-200 hover:bg-base-200 hover:text-primary ${
            isActive ? "dock-active bg-base-200 text-primary" : ""
        }`;

    return (
        <div className="dock lg:hidden">
            <NavLink
                to="/"
                end
                aria-label="Accueil"
                title="Accueil"
                className={dockItemClassName}
            >
                <HiHome className="size-[1.35em]" />
            </NavLink>

            <NavLink
                to="/publications"
                aria-label="Publications"
                title="Publications"
                className={dockItemClassName}
            >
                <HiMiniNewspaper className="size-[1.35em]" />
            </NavLink>

            <NavLink
                to="/favoris"
                aria-label="Favoris"
                title="Favoris"
                className={dockItemClassName}
            >
                <FaHeart className="size-[1.2em]" />
            </NavLink>

            <NavLink
                to="/matchs"
                aria-label="Matchs"
                title="Matchs"
                className={dockItemClassName}
            >
                <FaFutbol className="size-[1.2em]" />
            </NavLink>

            <NavLink
                to="/profile"
                aria-label="Profile"
                title="Profile"
                className={dockItemClassName}
            >
                <FaRegUserCircle className="size-[1.2em]" />
            </NavLink>
        </div>
    )
}

export default Navbar;