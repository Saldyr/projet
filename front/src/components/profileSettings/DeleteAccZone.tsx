import DeleteActionButton from "../ui/DeleteActionButton";
import { useDeleteUserAccount } from "../../hooks/useProfile";

export const DeleteAccZone = () => {
    const deleteAccount = useDeleteUserAccount();

    const handleConfirm = () =>
        new Promise<void>((resolve, reject) => {
            deleteAccount.mutate(undefined, {
                onSuccess: () => resolve(),
                onError: reject,
            });
        });

    return (
        <>
            <div className="divider mt-18 text-xs text-error/50">
                Suppression du Compte
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-error/20 bg-error/5 p-4 shadow-sm sm:flex-row">
                <div className="text-center sm:text-left">
                    <h4 className="text-sm font-bold text-error">
                        Supprimer le compte
                    </h4>
                    <p className="text-xs text-base-content/60">
                        Cette action effacera définitivement votre profil et
                        toutes vos activités.
                    </p>
                </div>

                <DeleteActionButton
                    label="Supprimer mon compte"
                    title="Supprimer définitivement le compte ?"
                    message={
                        <>
                            Cette action est <b>irréversible</b>. Vous perdrez
                            l'accès à toutes vos données, vos statistiques, vos
                            configurations, etc sur Sportify.
                        </>
                    }
                    confirmLabel="Oui, supprimer mon compte"
                    onConfirm={handleConfirm}
                    isPending={deleteAccount.isPending}
                    className="btn btn-outline btn-error btn-sm gap-2 w-full sm:w-auto sm:btn-md"
                />
            </div>

            {deleteAccount.isError && (
                <p className="mt-3 text-sm font-medium text-error">
                    {deleteAccount.error?.message ??
                        "Une erreur est survenue pendant la suppression du compte."}
                </p>
            )}
        </>
    );
};
