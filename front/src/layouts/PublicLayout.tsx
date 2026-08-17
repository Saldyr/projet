import { Outlet } from "react-router";
import {
  appBackgroundClassName,
  appBackgroundOverlayClassName,
  glassSurfaceClassName,
} from "../styles/uiClasses";

export default function PublicLayout() {

  // Possibilité de devoir définir un autre Public Layout pour les pages 
  //accessibles au visiteur (sans authentification) comme la HomePage
  //Voir Whimsical
  return (
    <div className={`${appBackgroundClassName} px-4 py-10`}>
      <div aria-hidden className={appBackgroundOverlayClassName} />
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
        <div className={`${glassSurfaceClassName} w-full rounded-3xl p-6 shadow-sm`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
