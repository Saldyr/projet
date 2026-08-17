import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./guards/PrivateRoute";
import { FavoritesPage, HomePage, MatchsCreatePage, MatchsEditPage, MatchsPage, NotFoundPage, ProfilePage, ProfileEditPage, PublicationsPage } from "./pages/index.ts";
import { LoginPage, SignupPage } from "./pages/auth";
import { AppLayout, PublicLayout } from "./layouts";

export function App() {
    return (
        <>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/signin" element={<LoginPage />} />
                </Route>

                {/* Route privée pour les utilisateurs connectés avec la mise en page
                    Pas encore de role défini pour le moment
                */}
                <Route
                    element={
                        <PrivateRoute /*allowedRoles={["user", "manager"]}*/ />
                    }
                >
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/publications"
                            element={<PublicationsPage />}
                        />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile/settings" element={<ProfileEditPage />} />
                        <Route path="/favoris" element={<FavoritesPage />} />
                        <Route path="/matchs" element={<MatchsPage />} />
                        <Route path="/matchs/nouveau" element={<MatchsCreatePage />} />
                        <Route path="/matchs/:id/modifier" element={<MatchsEditPage />} />
                    </Route>
                </Route>

                {/* Route privée pour le rôle de manager avec mise en page spécifique du rôle*/}
                <Route
                    element={<PrivateRoute allowedRoles={["manager"]} />}
                ></Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ReactQueryDevtools />
        </>
    );
}
