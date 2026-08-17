import logo from "../assets/logo.png";
import type { BrandLogoProps } from "../types";

export default function BrandLogo({ className = "", imageClassName = "" }: BrandLogoProps) {
  return (
    <div
      className={`flex h-24 w-24 items-center justify-center overflow-visible ${className}`.trim()}
    >
      <img
        src={logo}
        alt="Sportify"
        className={`h-24 w-auto scale-125 object-contain ${imageClassName}`.trim()}
      />
    </div>
  );
}
