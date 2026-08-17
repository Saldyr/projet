import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreateMatchFormValues, MatchClubOption } from "../../types";

type MatchFormFieldsProps = {
    clubOptions: MatchClubOption[];
    register: UseFormRegister<CreateMatchFormValues>;
    errors: FieldErrors<CreateMatchFormValues>;
    selectedHomeClub: string;
};

const MatchFormFields = ({
    clubOptions,
    register,
    errors,
    selectedHomeClub,
}: MatchFormFieldsProps) => {
    return (
        <>
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="label">Club domicile</label>
                    <select
                        className={`select select-bordered w-full ${errors.clubHomeId ? "select-error" : ""}`}
                        {...register("clubHomeId", {
                            required: "Le club domicile est requis",
                        })}
                    >
                        <option value="" disabled>
                            Selectionner un club
                        </option>
                        {clubOptions.map((club) => (
                            <option key={club.id} value={club.id}>
                                {club.name}
                            </option>
                        ))}
                    </select>
                    {errors.clubHomeId && (
                        <p className="mt-1 text-sm text-error">
                            {errors.clubHomeId.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="label">Club exterieur</label>
                    <select
                        className={`select select-bordered w-full ${errors.clubAwayId ? "select-error" : ""}`}
                        {...register("clubAwayId", {
                            required: "Le club exterieur est requis",
                            validate: (value) =>
                                value !== selectedHomeClub ||
                                "Les deux clubs doivent etre differents",
                        })}
                    >
                        <option value="" disabled>
                            Selectionner un club
                        </option>
                        {clubOptions.map((club) => (
                            <option key={club.id} value={club.id}>
                                {club.name}
                            </option>
                        ))}
                    </select>
                    {errors.clubAwayId && (
                        <p className="mt-1 text-sm text-error">
                            {errors.clubAwayId.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="label">Debut du match</label>
                    <input
                        type="datetime-local"
                        className={`input input-bordered w-full ${errors.startDate ? "input-error" : ""}`}
                        {...register("startDate", {
                            required: "La date de debut est requise",
                        })}
                    />
                    {errors.startDate && (
                        <p className="mt-1 text-sm text-error">
                            {errors.startDate.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="label">Fin du match</label>
                    <input
                        type="datetime-local"
                        className={`input input-bordered w-full ${errors.endDate ? "input-error" : ""}`}
                        {...register("endDate", {
                            required: "La date de fin est requise",
                            validate: (value, formValues) =>
                                new Date(value) > new Date(formValues.startDate) ||
                                "La fin doit etre apres le debut",
                        })}
                    />
                    {errors.endDate && (
                        <p className="mt-1 text-sm text-error">
                            {errors.endDate.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="label">Adresse du match</label>
                <input
                    type="text"
                    placeholder="Ex : Stade Pierre-Mauroy, Lille"
                    className={`input input-bordered w-full ${errors.matchAddress ? "input-error" : ""}`}
                    {...register("matchAddress", {
                        required: "L adresse du match est requise",
                        minLength: {
                            value: 5,
                            message:
                                "L adresse doit contenir au moins 5 caracteres",
                        },
                    })}
                />
                {errors.matchAddress && (
                    <p className="mt-1 text-sm text-error">
                        {errors.matchAddress.message}
                    </p>
                )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="label">Score domicile (optionnel)</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="0"
                        className={`input input-bordered w-full ${errors.scoreTeamHome ? "input-error" : ""}`}
                        {...register("scoreTeamHome", {
                            validate: (value) =>
                                !value ||
                                Number(value) >= 0 ||
                                "Le score doit etre positif",
                        })}
                    />
                    {errors.scoreTeamHome && (
                        <p className="mt-1 text-sm text-error">
                            {errors.scoreTeamHome.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="label">Score exterieur (optionnel)</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="0"
                        className={`input input-bordered w-full ${errors.scoreTeamAway ? "input-error" : ""}`}
                        {...register("scoreTeamAway", {
                            validate: (value) =>
                                !value ||
                                Number(value) >= 0 ||
                                "Le score doit etre positif",
                        })}
                    />
                    {errors.scoreTeamAway && (
                        <p className="mt-1 text-sm text-error">
                            {errors.scoreTeamAway.message}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MatchFormFields;
