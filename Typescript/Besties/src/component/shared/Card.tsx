import type { FC, ReactElement, ReactNode } from "react";

interface CardInterface {
  title?: ReactNode 
  children?: ReactElement
  footer?: ReactElement 
  divider?: boolean

}

const Card: FC<CardInterface> = ({
  title ,
  children ,
  footer,
  divider=false
}) => {
  return (
    <div className="shadow-lg px-5 py-4 rounded-lg border border-gray-100 space-y-2 bg-white">
      {
        title && 
      <h1 className="text-lg font-semibold capitalize">{title}</h1>
      }
      {
        divider &&
        <div className="border-b border-gray-100 -mx-5" />
      }
      {
        children && 
      <div className="text-gray-500">{children}</div>
      }
      {footer && (
        <div className="mt-4">
          <h1>{footer}</h1>
        </div>
      )}
    </div>
  );
};

export default Card;
