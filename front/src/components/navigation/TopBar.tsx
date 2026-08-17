import { useState } from "react";
import { Link, NavLink } from "react-router";
import BrandLogo from "../BrandLogo";
import { glassSurfaceClassName } from "../../styles/uiClasses";

const DesktopNavbar = () => {
    const [isManagerModeEnabled, setIsManagerModeEnabled] = useState(false);

    const navItemClassName = ({ isActive }: { isActive: boolean }) =>
        `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive
            ? "bg-primary text-primary-content shadow-sm"
            : "text-base-content/70 hover:bg-base-200 hover:text-primary"
        }`;

    return (
        <footer className={`${glassSurfaceClassName} hidden border-t lg:block`}>
            <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-6 px-8 py-5 xl:px-12 2xl:px-16">
                <Link to="/" className="group flex min-w-0 items-center gap-3 rounded-full pr-4 transition-colors hover:bg-base-100/70">
                    <BrandLogo />
                    <div className="min-w-0">
                        <span className="block text-sm font-semibold tracking-tight text-base-content">Sportify</span>
                        <p className="truncate text-xs text-base-content/60 transition-colors group-hover:text-base-content/80">
                            Ton espace sport, en version desktop.
                        </p>
                    </div>
                </Link>

                <nav className={`${glassSurfaceClassName} justify-self-center flex items-center gap-2 rounded-full p-2 shadow-sm`}>
                    <NavLink to="/" end className={navItemClassName}>
                        Accueil
                    </NavLink>
                    <NavLink to="/publications" className={navItemClassName}>
                        Publications
                    </NavLink>
                    <NavLink to="/favoris" className={navItemClassName}>
                        Favoris
                    </NavLink>
                    <NavLink to="/matchs" className={navItemClassName}>
                        Matchs
                    </NavLink>
                    <NavLink to="/profile" className={navItemClassName}>
                        Profile
                    </NavLink>
                </nav>

                <div className="flex items-center justify-self-end gap-3">
                    <label className={`${glassSurfaceClassName} flex items-center gap-2 rounded-full px-2 py-1.5 shadow-sm sm:gap-3 sm:px-3 sm:py-2`}>
                        <span className="text-xs font-medium sm:hidden">Manager</span>
                        <span className="hidden text-sm font-medium sm:inline">Manager mode</span>
                        <input
                            type="checkbox"
                            aria-label="Activer le mode manager"
                            checked={isManagerModeEnabled}
                            onChange={() => setIsManagerModeEnabled((currentValue) => !currentValue)}
                            className={`toggle toggle-xs sm:toggle-sm ${isManagerModeEnabled ? "toggle-success" : "toggle-primary"}`}
                        />
                        <span
                            className={`min-w-6 text-[10px] font-semibold uppercase tracking-wide sm:min-w-8 sm:text-xs ${isManagerModeEnabled ? "text-success" : "text-base-content/70"
                                }`}
                        >
                            {isManagerModeEnabled ? "On" : "Off"}
                        </span>
                    </label>
                    <button
                        type="button"
                        aria-label="Voir les notifications"
                        className={`${glassSurfaceClassName} relative flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-colors hover:bg-base-200 sm:h-11 sm:w-11`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary sm:right-2.5 sm:top-2.5"></span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default DesktopNavbar;
