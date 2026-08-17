import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateProfile } from "../../hooks/useProfile";
import { useCurrentUser } from "../../stores/user.store";
import type { UpdateProfileRequest } from "../../types";

export const ProfileSetForm = () => {
    const navigate = useNavigate();
    const currentUser = useCurrentUser();

    const {
        mutate: updateProfile,
        isPending,
        isError,
        error,
    } = useUpdateProfile();

    //Pré-remplissage formulaire dpuis le store Zustand
    const [form, setForm] = useState({
        firstName: currentUser?.firstName ?? "",
        lastName: currentUser?.lastName ?? "",
        email: currentUser?.email ?? "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [validationError, setValidationError] = useState<string | null>(null);

    //Pré-remplissage une fois que le user est disponible dans le store
    /* useEffect cause un rerender => problématique au niveau de la performance 
    // Les infos user sont déjà dans le store Zustand (synchronie)
    useEffect(() => {
        if (currentUser) {
            setForm((prev) => ({
                ...prev,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
            }));
        }
    }, [currentUser]);
    */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setValidationError(null);
    };

    const handleSubmit = () => {
        if (form.newPassword && form.newPassword !== form.confirmNewPassword) {
            setValidationError("Les mots de passe ne correspondent pas");
            return;
        }

        // On ne envoie que les champs remplis
        const payload: UpdateProfileRequest = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            ...(form.newPassword && {
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            }),
        };

        updateProfile(payload, { onSuccess: () => navigate("/profile") });
    };

    return (
        <div className="flex-1">
            <fieldset className="fieldset bg-base-200 border border-base-300 p-6 rounded-2xl space-y-4 shadow-sm">
                <legend className="fieldset-legend font-bold text-primary">
                    Informations Personnelles
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label text-xs font-bold uppercase opacity-70">
                            Prénom
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:input-primary"
                            placeholder="Prénom"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label text-xs font-bold uppercase opacity-70">
                            Nom
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:input-primary"
                            placeholder="Nom de famille"
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-70">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="exemple@mail.com"
                    />
                </div>

                <div className="divider text-xs opacity-40">Sécurité</div>

                <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-70">
                        Mot de Passe Actuel
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="************"
                    />
                </div>

                <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-70">
                        Nouveau Mot de Passe
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="************"
                    />
                </div>

                <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-70">
                        Confirmer le Mot de Passe
                    </label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={form.confirmNewPassword}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="************"
                    />
                </div>

                {/* Erreurs */}
                {validationError && (
                    <p className="text-error text-sm">{validationError}</p>
                )}

                {isError && (
                    <p className="text-error text-sm">
                        {(error as Error)?.message ??
                            "Une erreur est survenue."}
                    </p>
                )}
            </fieldset>

            {/* côte à côte sur PC, empilées sur Mobile */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                    className="btn btn-primary flex-1 shadow-md"
                    onClick={handleSubmit}
                    disabled={isPending}
                >
                    {isPending ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <BiSave size={20} />
                    )}
                    {isPending ? "Enregistrement..." : "Enregistrer"}
                </button>
            </div>

            <div className="text-center mt-6">
                <Link
                    to="/profile"
                    className="link link-hover text-sm opacity-60"
                >
                    Annuler et retourner au profile
                </Link>
            </div>
        </div>
    );
};
