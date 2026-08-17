import { useState, type ReactNode } from "react";
import { BiTrash } from "react-icons/bi";
import { ConfirmDeleteModal } from "../modals/ConfirmDeleteModal";

export interface DeleteActionButtonProps {
    label: string;
    title: string;
    message: ReactNode;
    confirmLabel?: string;
    onConfirm: () => void | Promise<void>;
    isPending?: boolean;
    className?: string;
    showIcon?: boolean;
    disabled?: boolean;
}

const DeleteActionButton = ({
    label,
    title,
    message,
    confirmLabel,
    onConfirm,
    isPending = false,
    className = "btn btn-outline btn-error btn-sm gap-2",
    showIcon = true,
    disabled = false,
}: DeleteActionButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = async () => {
        try {
            await onConfirm();
            setIsModalOpen(false);
        } catch {
            // La modal reste ouverte pour laisser le parent afficher l'erreur.
        }
    };

    const handleClose = () => {
        if (!isPending) {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <button
                type="button"
                className={className}
                onClick={() => setIsModalOpen(true)}
                disabled={disabled || isPending}
            >
                {isPending ? (
                    <span className="loading loading-spinner loading-sm" />
                ) : (
                    <>
                        {showIcon && <BiTrash size={16} />}
                        {label}
                    </>
                )}
            </button>

            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                isPending={isPending}
                title={title}
                message={message}
                confirmLabel={confirmLabel}
            />
        </>
    );
};

export default DeleteActionButton;
