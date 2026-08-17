type MatchListFeedbackProps = {
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
};

const MatchListFeedback = ({
    isLoading,
    isError,
    isEmpty,
}: MatchListFeedbackProps) => {
    if (isLoading) {
        return (
            <p className="text-sm text-base-content/70">
                Chargement des matchs...
            </p>
        );
    }

    if (isError) {
        return (
            <p className="text-sm text-error">
                Impossible de recuperer la liste des matchs.
            </p>
        );
    }

    if (isEmpty) {
        return (
            <p className="text-sm text-base-content/70">
                Aucun match n est encore disponible.
            </p>
        );
    }

    return null;
};

export default MatchListFeedback;
