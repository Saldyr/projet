import type { ReactNode } from "react";

export interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isPending: boolean;
    title: string;
    message: ReactNode;
    confirmLabel?: string;
}

export const ConfirmDeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    isPending,
    title,
    message,
    confirmLabel = "Oui, supprimer",
}: ConfirmDeleteModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-sm">
            <div className="modal-box border border-base-300 shadow-xl">
                <h3 className="text-lg font-bold text-error">{title}</h3>
                <div className="py-4 text-sm text-base-content/70">{message}</div>

                <div className="modal-action">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        className="btn btn-error shadow-md"
                        onClick={onConfirm}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            confirmLabel
                        )}
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
};
