import BrandLogo from "./BrandLogo";
import { glassSurfaceClassName } from "../styles/uiClasses";

const Footer = () => {
    return (
        <footer className={`${glassSurfaceClassName} hidden border-t lg:block`}>
            <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-8 py-5 xl:px-12 2xl:px-16">
                <div className="flex min-w-0 items-center gap-4">
                    <BrandLogo />
                    <div className="min-w-0">
                    </div>
                </div>

                <div className="flex items-center justify-self-end gap-3">
                    <div className={`${glassSurfaceClassName} rounded-full px-4 py-2 text-sm font-medium text-base-content shadow-sm`}>
                        Version desktop
                    </div>
                    <div className={`${glassSurfaceClassName} rounded-full px-4 py-2 text-sm text-base-content/70 shadow-sm`}>
                        Copyright © {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;