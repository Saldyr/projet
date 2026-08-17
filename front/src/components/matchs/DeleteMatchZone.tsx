import DeleteMatchButton from "./DeleteMatchButton";

type DeleteMatchZoneProps = {
    matchId: number;
    onSuccess: () => void;
};

const DeleteMatchZone = ({ matchId, onSuccess }: DeleteMatchZoneProps) => {
    return (
        <>
            <div className="divider mt-10 text-xs text-error/50">
                Suppression du match
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-error/20 bg-error/5 p-4 shadow-sm sm:flex-row">
                <div className="text-center sm:text-left">
                    <h4 className="text-sm font-bold text-error">
                        Supprimer le match
                    </h4>
                    <p className="text-xs text-base-content/60">
                        Cette action effacera définitivement la rencontre du
                        calendrier. Seul le créateur peut effectuer cette
                        opération.
                    </p>
                </div>

                <DeleteMatchButton
                    matchId={matchId}
                    onSuccess={onSuccess}
                    label="Supprimer le match"
                    className="btn btn-outline btn-error btn-sm gap-2 w-full sm:w-auto sm:btn-md"
                />
            </div>
        </>
    );
};

export default DeleteMatchZone;
