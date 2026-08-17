import type { ReactNode } from "react";
import { pageSubtitleClassName, pageTitleClassName } from "../../styles/uiClasses";

type MatchPageShellProps = {
    title: string;
    subtitle: string;
    action?: ReactNode;
    children: ReactNode;
};

const MatchPageShell = ({
    title,
    subtitle,
    action,
    children,
}: MatchPageShellProps) => {
    return (
        <section className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-10 lg:px-6 lg:py-14 xl:px-8">
            <div className="w-full text-center lg:text-left">
                <h1
                    className={`${pageTitleClassName} text-4xl font-extrabold sm:text-5xl`}
                >
                    {title}
                </h1>
                <p
                    className={`${pageSubtitleClassName} mx-auto mt-3 max-w-2xl text-base md:text-lg lg:mx-0`}
                >
                    {subtitle}
                </p>

                {action && (
                    <div className="mt-6 flex justify-center lg:mt-8 lg:justify-start">
                        {action}
                    </div>
                )}

                {children}
            </div>
        </section>
    );
};

export default MatchPageShell;
