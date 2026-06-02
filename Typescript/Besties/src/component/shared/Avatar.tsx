import type { FC, ReactNode } from "react";

interface avatarInterface {
  title?: string | null;
  subtitle?: ReactNode;
  image?: string;
  titleColor?: string;
  subtitleColor?: string;
  size?: "lg" | "md"
}

const Avatar: FC<avatarInterface> = (
{  image,
  title,
  subtitle = "subtitle is missing",
  titleColor,
  size="lg",
  subtitleColor}
) => {
  return (
    <div className="flex gap-3 items-center">
      {image && (
<<<<<<< HEAD
        <img
          src={image}
          className={`${
            size === "lg"
              ? "w-12 h-12"
              : "w-8 h-8 "
          }
            rounded-full
            border-2
            border-white/60
            object-cover
            shrink-0`}
        />
      )}
      {title && subtitle && (
        <div className="flex flex-col">
          <h1
            className={`$ ${
              size === "lg" ? "text-lg/6" : "text-sm"
            }
            font-medium
            capitalize`}
            style={{ color: titleColor }}>
=======
        <img src={image} className={`${size=== "lg" ? "w-12 h-12" : "w-8 h-8"} rounded-full border-2 border-white/60 object-cover`} />
      )}
      {title && subtitle && (
        <div className="flex flex-col">
          <h1 className={`${size==="lg" ? "text-lg/6" :  "text-sm"} font-medium capitalize` }style={{ color: titleColor }}>
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
            {title}
          </h1>
          <div className="text-sm capitalize" style={{ color: subtitleColor }}>
            {subtitle}
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
