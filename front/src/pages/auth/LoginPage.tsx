import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth.store";
import { useForm } from "react-hook-form";
import { useSignIn } from "../../hooks/useAuth";

interface SigninFormData {
    email: string;
    password: string;
}

export default function SigninPage() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const signIn = useSignIn();

// useForm et ses outils
    const { //Permet d'assurer la cohérence des champs du formulaire et la sécurité TypeScript
        register, // Relie un champ input au formulaire et injecte automatiquement les props nécessaires via {...register("email")}
        handleSubmit, // Gère la soumission du formulaire et encapsule la validation avant l'appel du submit
        formState: { errors }, // objet qui contient les erreurs de validation des champs du formulaire
    } = useForm<SigninFormData>(); // Hook Form typé avec SigninFormData pour définir la structure des champs du formulaire

    const onSubmit = async (data: SigninFormData) => { // data contient les champs validés par React Hook Form (email, password)
        const response = await signIn.mutateAsync(data); // Appel de la mutation signIn (TanStack Query) → envoie les identifiants à l’API et attend la réponse
        console.log(response);
        setUser(response.user); // Stocke les données utilisateur dans le store Zustand
        setAccessToken(response.accessToken); // Stocke le token d’accès dans le store Zustand
        navigate("/"); // Redirection vers la page d’accueil après connexion réussie
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="flex flex-col">
                        <label className="label">Email</label>
                        <input
                            type="text"
                            placeholder="Entrez votre email"
                            className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                            {...register("email", {
                                required: "Email requis",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email invalide",
                                },
                            })}
                        />
                        {errors.email && (
                            <label className="label mt-1">
                                <span className="label-text-alt text-error">
                                    {errors.email.message}
                                </span>
                            </label>
                        )}
                        <label className="label ">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                            {...register("password", {
                                required: "Mot de passe requis",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 caractères",
                                },
                            })}
                        />
                        {errors.password && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    {errors.password.message}
                                </span>
                            </label>
                        )}
                    </fieldset>
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary btn-xs sm:btn-sm md:btn-md px-8"
                            disabled={signIn.isPending}
                        >
                        {signIn.isPending ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Se connecter"
                            )}
                        </button>
												{signIn.isError && (
													<span className="label-text-alt text-error">
														{signIn.error?.message}
													</span>
												)}
                    </div>
                </form>
                <Link to="forgetPassword" className="block text-center mt-4 underline"> Mot de passe oublié ?</Link>
            </div>
        </>
    );
}
