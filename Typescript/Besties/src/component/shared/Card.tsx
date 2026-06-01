import type { FC, ReactElement } from "react";

interface CardInterface {
  title?: string;
  children?: string;
  footer?: ReactElement 
}

const Card: FC<CardInterface> = ({
  title ,
  children ,
  footer,
}) => {
  return (
    <div className="shadow-lg p-8 rounded-lg border border-gray-100 space-y-2 bg-white">
      {
        title && 
      <h1 className="text-lg font-semibold">{title}</h1>
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
