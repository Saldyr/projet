import DeleteActionButton from "../ui/DeleteActionButton";
import { useDeleteMatch } from "../../hooks/useMatches";

type DeleteMatchButtonProps = {
    matchId: number;
    onSuccess?: () => void;
    className?: string;
    label?: string;
};

const DeleteMatchButton = ({
    matchId,
    onSuccess,
    className = "btn btn-outline btn-error btn-sm gap-2",
    label = "Supprimer",
}: DeleteMatchButtonProps) => {
    const deleteMatch = useDeleteMatch();

    const handleConfirm = () =>
        new Promise<void>((resolve, reject) => {
            deleteMatch.mutate(matchId, {
                onSuccess: () => {
                    onSuccess?.();
                    resolve();
                },
                onError: reject,
            });
        });

    return (
        <div className="flex flex-col items-start gap-1">
            <DeleteActionButton
                label={label}
                title="Supprimer ce match ?"
                message={
                    <>
                        Cette action est <b>irréversible</b>. Le match sera
                        définitivement retiré du calendrier Sportify.
                    </>
                }
                confirmLabel="Oui, supprimer le match"
                onConfirm={handleConfirm}
                isPending={deleteMatch.isPending}
                className={className}
            />

            {deleteMatch.isError && (
                <p className="text-sm font-medium text-error">
                    {deleteMatch.error?.message ??
                        "Une erreur est survenue pendant la suppression du match."}
                </p>
            )}
        </div>
    );
};

export default DeleteMatchButton;
