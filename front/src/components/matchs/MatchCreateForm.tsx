import { useForm } from "react-hook-form";
import { useCreateMatch } from "../../hooks/useMatches";
import type {
    CreateMatchFormValues,
    MatchClubOption,
    MatchPreview,
} from "../../types";
import MatchFormFeedback from "./MatchFormFeedback";
import MatchFormFields from "./MatchFormFields";
import MatchFormShell from "./MatchFormShell";
import {
    buildMatchPayload,
    buildMatchPreview,
    EMPTY_MATCH_FORM_VALUES,
} from "./matchForm.utils";

type MatchCreateFormProps = {
    clubOptions: MatchClubOption[];
    onSubmitPreview: (matchPreview: MatchPreview) => void;
    onResetPreview: () => void;
};

const MatchCreateForm = ({
    clubOptions,
    onSubmitPreview,
    onResetPreview,
}: MatchCreateFormProps) => {
    const createMatch = useCreateMatch();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateMatchFormValues>({
        defaultValues: EMPTY_MATCH_FORM_VALUES,
    });

    const selectedHomeClub = watch("clubHomeId");

    const onSubmit = async (data: CreateMatchFormValues) => {
        createMatch.reset();
        await createMatch.mutateAsync(buildMatchPayload(data));
        onSubmitPreview(buildMatchPreview(data, clubOptions));
        reset(EMPTY_MATCH_FORM_VALUES);
    };

    const handleReset = () => {
        reset(EMPTY_MATCH_FORM_VALUES);
        createMatch.reset();
        onResetPreview();
    };

    return (
        <MatchFormShell
            badge="Creation"
            title="Creer un match"
            description="Renseigne les informations essentielles de la rencontre pour preparer sa publication dans le calendrier."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-5">
                <MatchFormFields
                    clubOptions={clubOptions}
                    register={register}
                    errors={errors}
                    selectedHomeClub={selectedHomeClub}
                />

                <MatchFormFeedback
                    isPending={createMatch.isPending}
                    submitLabel="Creer le match"
                    onReset={handleReset}
                    isSuccess={createMatch.isSuccess}
                    isError={createMatch.isError}
                    successMessage="Match cree avec succes."
                    fallbackErrorMessage="Une erreur est survenue pendant la creation du match."
                    errorMessage={createMatch.error?.message}
                />
            </form>
        </MatchFormShell>
    );
};

export default MatchCreateForm;
