import { Outlet } from "react-router";

export default function PrivateLayout() {
    return (
        <div className="min-h-screen bg-base-100">
            {/* Navbar, Footer, etc à définir ici */}
            <Outlet />
        </div>
    );
}