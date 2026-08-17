import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUp } from "../../hooks/useAuth";
import { useAuthStore } from "../../stores/auth.store";

interface SignupFormData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword?: string;
    role: string;
}

export default function SignupPage() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const signUp = useSignUp();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>();

    const password = watch("password");

    const onSubmit = async (data: SignupFormData) => {
        const { confirmPassword, ...registerPayload } = data;
        const response = await signUp.mutateAsync(registerPayload);
        console.log(response);
        setUser(response.user);
        setAccessToken(response.accessToken);
        navigate("/");
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-3xl">Bienvenue !</h1>
            <h2 className="text-2xl font-bold">Créer votre compte</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
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
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.email.message}
                            </span>
                        </label>
                    )}
                    <label className="label">Prénom</label>
                    <input
                        type="text"
                        placeholder="Entrez votre prénom"
                        className={`input input-bordered w-full ${errors.firstName ? "input-error" : ""}`}
                        {...register("firstName", {
                            required: "Prénom requis",
                            minLength: {
                                value: 2,
                                message: "Minimum 2 caractères",
                            },
                        })}
                    />
                    {errors.firstName && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.firstName.message}
                            </span>
                        </label>
                    )}
                    <label className="label">Nom</label>
                    <input
                        type="text"
                        placeholder="Entrez votre nom"
                        className={`input input-bordered w-full ${errors.lastName ? "input-error" : ""}`}
                        {...register("lastName", {
                            required: "Nom complet requis",
                            minLength: {
                                value: 2,
                                message: "Minimum 2 caractères",
                            },
                        })}
                    />
                    {errors.lastName && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.lastName.message}
                            </span>
                        </label>
                    )}
                    <label className="label">Mot de passe</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                        {...register("password", {
                            required: "Mot de passe requis",
                            minLength: {
                                value: 8,
                                message: "Minimum 8 caractères",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                message:
                                    "Doit contenir une majuscule, une minuscule et un chiffre",
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
                    <label className="label">
                        Confirmez votre mot de passe
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className={`input input-bordered w-full ${errors.confirmPassword ? "input-error" : ""}`}
                        {...register("confirmPassword", {
                            required: "Confirmation requise",
                            validate: (value) =>
                                value === password ||
                                "Les mots de passe ne correspondent pas",
                        })}
                    />
                    {errors.confirmPassword && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.confirmPassword.message}
                            </span>
                        </label>
                    )}
                </fieldset>
                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary btn-xs sm:btn-sm md:btn-md px-8"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            "S'inscrire"
                        )}
                    </button>
                </div>
            </form>
            <p>Déjà un compte ? </p>
            <Link to="login" className="underline">
                Vous connectez
            </Link>
        </div>
    );
}
