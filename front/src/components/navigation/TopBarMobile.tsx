import { useState } from "react";
import { Link } from "react-router";
import BrandLogo from "../BrandLogo";
import { glassSurfaceClassName } from "../../styles/uiClasses";

const TopBar = () => {
    const [isManagerModeEnabled, setIsManagerModeEnabled] = useState(false);

    return(
    <div className={`${glassSurfaceClassName} navbar sticky top-0 z-30 border-b px-4 shadow-sm md:px-6 lg:hidden`}>
    <div className="navbar-start">
        <Link to="/" className="logo flex items-center gap-3">
            <BrandLogo />
        </Link>
    </div>
    <div className="navbar-end gap-2 sm:gap-3">
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
            className={`min-w-6 text-[10px] font-semibold uppercase tracking-wide sm:min-w-8 sm:text-xs ${
                isManagerModeEnabled ? "text-success" : "text-base-content/70"
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
)
}

export default TopBar;