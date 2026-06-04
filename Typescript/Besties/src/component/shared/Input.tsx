import type { FC } from "react";


interface InputInterface{
  name: string
  placeholder?: string
  type?: string
  
}

const Input: FC<InputInterface> = ({
  name = "input",
  placeholder = "enter text here",
  type = "text",
}) => {
  return (
    <input
      className="border border-gray-300 rounded-lg px-3 w-full py-2 "
      placeholder={placeholder}
      name={name}
      type={type}
    />
  );
};

export default Input;
