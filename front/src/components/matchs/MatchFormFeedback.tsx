type MatchFormFeedbackProps = {
    isPending: boolean;
    submitLabel: string;
    onReset: () => void;
    isSuccess: boolean;
    isError: boolean;
    successMessage: string;
    fallbackErrorMessage: string;
    errorMessage?: string;
};

const MatchFormFeedback = ({
    isPending,
    submitLabel,
    onReset,
    isSuccess,
    isError,
    successMessage,
    fallbackErrorMessage,
    errorMessage,
}: MatchFormFeedbackProps) => {
    return (
        <>
            <div className="flex flex-wrap gap-3 pt-2">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isPending}
                >
                    {isPending ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        submitLabel
                    )}
                </button>
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={onReset}
                >
                    Reinitialiser
                </button>
            </div>

            {isSuccess && (
                <p className="text-sm font-medium text-success">{successMessage}</p>
            )}

            {isError && (
                <p className="text-sm font-medium text-error">
                    {errorMessage ?? fallbackErrorMessage}
                </p>
            )}
        </>
    );
};

export default MatchFormFeedback;
