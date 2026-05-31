import "remixicon/fonts/remixicon.css"

const ButtenModel = {
  primary:
    "px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium cursor-pointer",
  secondary:
    "px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-medium cursor-pointer",
  tertiary:
    "px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-medium cursor-pointer",
  success:
    "px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium cursor-pointer",
  info: "px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium cursor-pointer",
  warning:
    "px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-medium cursor-pointer",
  danger:
    "px-6 py-2 bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-medium cursor-pointer",
};

const Button = ({ children = "Submit", type = "primary", onClick, icon , }) => {
  return (
    <button className={ButtenModel[type]} onClick={onClick}>
      {icon && <i className={`ri-${icon} mr-2 `}></i>}
      {children}
    </button>
  );
};

export default Button;
