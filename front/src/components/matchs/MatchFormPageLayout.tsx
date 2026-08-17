import type { ReactNode } from "react";

type MatchFormPageLayoutProps = {
    form: ReactNode;
    preview: ReactNode;
};

const MatchFormPageLayout = ({ form, preview }: MatchFormPageLayoutProps) => {
    return (
        <div className="mt-6 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:items-start lg:gap-12 xl:gap-16">
            {form}
            {preview}
        </div>
    );
};

export default MatchFormPageLayout;
