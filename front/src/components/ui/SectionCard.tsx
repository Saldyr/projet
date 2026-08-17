import type { ReactNode } from "react";
import { glassSurfaceClassName } from "../../styles/uiClasses";

type SectionCardProps = {
    children: ReactNode;
    sectionClassName?: string;
    cardClassName?: string;
    bodyClassName?: string;
};

const SectionCard = ({
    children,
    sectionClassName = "",
    cardClassName = "",
    bodyClassName = "",
}: SectionCardProps) => {
    return (
        <section className={sectionClassName.trim()}>
            <div className={`${glassSurfaceClassName} card shadow-sm ${cardClassName}`.trim()}>
                <div className={`card-body ${bodyClassName}`.trim()}>{children}</div>
            </div>
        </section>
    );
};

export default SectionCard;
