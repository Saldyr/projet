import type { IAvatarProps } from "../types";


export const Avatar = ({size, src, alt}: IAvatarProps) => {

    return (
        <div className="avatar">
            <div className= {`${size} rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-4 shadow-2xl`}>
                <img
                    src={src || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"}
                    alt={alt || "Photo de Profile"}
                />
            </div>
        </div>
    );
};
