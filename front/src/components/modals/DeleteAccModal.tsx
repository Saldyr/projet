import type { ConfirmDeleteModalProps } from "./ConfirmDeleteModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

type DeleteAccountModalProps = Omit<
    ConfirmDeleteModalProps,
    "title" | "message" | "confirmLabel"
>;

export const DeleteAccountModal = ({
    isOpen,
    onClose,
    onConfirm,
    isPending,
}: DeleteAccountModalProps) => {
    return (
        <ConfirmDeleteModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            isPending={isPending}
            title="Supprimer définitivement le compte ?"
            message={
                <>
                    Cette action est <b>irréversible</b>. Vous perdrez l'accès à
                    toutes vos données, vos statistiques, vos configurations,
                    etc sur Sportify.
                </>
            }
            confirmLabel="Oui, supprimer mon compte"
        />
    );
};
