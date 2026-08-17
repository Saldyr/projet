import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/navigation/BottomBarMobile";
import DesktopNavbar from "../components/navigation/TopBar";
import TopBar from "../components/navigation/TopBarMobile";
import {
    appBackgroundClassName,
    appBackgroundOverlayClassName,
} from "../styles/uiClasses";

export default function MainLayout() {
    return (
        <div className={`${appBackgroundClassName} pb-24 lg:flex lg:min-h-screen lg:flex-col lg:pb-0`}>
            <div aria-hidden className={appBackgroundOverlayClassName} />
            <TopBar />
            <DesktopNavbar />

            <main className="lg:flex-1">
                <Outlet />
            </main>

            <Navbar />
            <Footer />
        </div>
    );
}