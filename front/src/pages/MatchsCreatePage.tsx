import { useState } from "react";
import {
    MatchCreateForm,
    MatchFormPageLayout,
    MatchPageShell,
    MatchPreviewCard,
} from "../components/matchs";
import { mockMatchClubs } from "../data/mockMatchClubs";
import type { MatchPreview } from "../types";

const MatchsCreatePage = () => {
    const [matchPreview, setMatchPreview] = useState<MatchPreview | null>(null);

    return (
        <MatchPageShell
            title="Nouveau match"
            subtitle="Cree et organise les rencontres de ton club dans une interface claire, lisible et pensee pour une gestion rapide du calendrier."
        >
            <MatchFormPageLayout
                form={
                    <MatchCreateForm
                        clubOptions={mockMatchClubs}
                        onSubmitPreview={setMatchPreview}
                        onResetPreview={() => setMatchPreview(null)}
                    />
                }
                preview={<MatchPreviewCard matchPreview={matchPreview} />}
            />
        </MatchPageShell>
    );
};

export default MatchsCreatePage;
