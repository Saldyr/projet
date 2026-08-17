import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateMatch } from "../../hooks/useMatches";
import type {
    CreateMatchFormValues,
    MatchClubOption,
    MatchPreview,
} from "../../types";
import MatchFormFeedback from "./MatchFormFeedback";
import MatchFormFields from "./MatchFormFields";
import MatchFormShell from "./MatchFormShell";
import DeleteMatchZone from "./DeleteMatchZone";
import { buildMatchPayload, buildMatchPreview } from "./matchForm.utils";

type MatchEditFormProps = {
    matchId: number;
    clubOptions: MatchClubOption[];
    initialValues: CreateMatchFormValues;
    onSubmitPreview: (matchPreview: MatchPreview) => void;
    onResetPreview: () => void;
    onSuccess: () => void;
};

const MatchEditForm = ({
    matchId,
    clubOptions,
    initialValues,
    onSubmitPreview,
    onResetPreview,
    onSuccess,
}: MatchEditFormProps) => {
    const updateMatch = useUpdateMatch(matchId);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateMatchFormValues>({
        defaultValues: initialValues,
    });

    useEffect(() => {
        reset(initialValues);
        onSubmitPreview(buildMatchPreview(initialValues, clubOptions));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues, reset]);

    const selectedHomeClub = watch("clubHomeId");

    const onSubmit = async (data: CreateMatchFormValues) => {
        updateMatch.reset();
        await updateMatch.mutateAsync(buildMatchPayload(data));
        onSubmitPreview(buildMatchPreview(data, clubOptions));
        onSuccess();
    };

    const handleReset = () => {
        reset(initialValues);
        updateMatch.reset();
        onSubmitPreview(buildMatchPreview(initialValues, clubOptions));
        onResetPreview();
    };

    return (
        <MatchFormShell
            badge="Modification"
            title="Modifier le match"
            description="Mets a jour les informations de la rencontre. Seul le createur du match peut effectuer cette modification."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-5">
                <MatchFormFields
                    clubOptions={clubOptions}
                    register={register}
                    errors={errors}
                    selectedHomeClub={selectedHomeClub}
                />

                <MatchFormFeedback
                    isPending={updateMatch.isPending}
                    submitLabel="Enregistrer les modifications"
                    onReset={handleReset}
                    isSuccess={updateMatch.isSuccess}
                    isError={updateMatch.isError}
                    successMessage="Match modifie avec succes."
                    fallbackErrorMessage="Une erreur est survenue pendant la modification du match."
                    errorMessage={updateMatch.error?.message}
                />
            </form>

            <DeleteMatchZone matchId={matchId} onSuccess={onSuccess} />
        </MatchFormShell>
    );
};

export default MatchEditForm;
