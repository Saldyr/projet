import type { ReactNode } from "react";
import { glassSurfaceClassName } from "../../styles/uiClasses";

type MatchFormShellProps = {
    badge: string;
    title: string;
    description: string;
    children: ReactNode;
};

const MatchFormShell = ({
    badge,
    title,
    description,
    children,
}: MatchFormShellProps) => {
    return (
        <div className={`${glassSurfaceClassName} card rounded-4xl shadow-sm`}>
            <div className="card-body p-6 text-left lg:p-8">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
                        {badge}
                    </p>
                    <h2 className="card-title text-xl">{title}</h2>
                    <p className="text-sm text-base-content/70">{description}</p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default MatchFormShell;
