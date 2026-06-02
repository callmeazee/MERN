import type { FC } from "react";

import "remixicon/fonts/remixicon.css";

const ButtenModel = {
  primary:
    "px-4 md:px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 ",
  secondary:
    "px-4 md:px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  tertiary:
    "px-4 md:px-6 py-2.5 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  success:
    "px-4 md:px-6 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  info: "px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  warning:
    "px-4 md:px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
  danger:
    "px-4 md:px-6 py-2.5 bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95",
};

interface ButtonInterface {
  children?: string;
  type?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "info"
    | "success";
  onClick?: () => void;
  icon?: string;
}

const Button: FC<ButtonInterface> = ({
  children = "Submit",
  type = "primary",
  onClick,
  icon,
}) => {
  return (
    <button className={ButtenModel[type]} onClick={onClick}>
      {icon && <i className={`ri-${icon} mr-2 `}></i>}
    
      {children}
    </button>
  );
};

export default Button;
