<<<<<<< HEAD
/* import type { FC, ReactElement, ReactNode } from "react";

=======
import type { FC, ReactElement, ReactNode } from "react";
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c

interface CardInterface {
  title?: ReactNode 
  children?: ReactElement
  footer?: ReactElement 
  divider?: boolean
<<<<<<< HEAD
  noPadding?: boolean
  className?:string
=======
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c

}

const Card: FC<CardInterface> = ({
  title ,
  children ,
  footer,
<<<<<<< HEAD
  divider = false,
  noPadding = false
  className = ""
}) => {
  return (
    <div
      className=" shadow-lg px-5 py-4  rounded-lg border border-gray-100 space-y-2 bg-white
  ">
      {title && (
        <h1
          // className="text-base md:text-lg lg:text-xl font-semibold capitalize tracking-tight"
          className="text-lg font-semibold capitalize">
          {title}
        </h1>
      )}
      {divider && <div className="border-b border-gray-100 -mx-5" />}
      {children && <div className="text-gray-500">{children}</div>}
=======
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
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
      {footer && (
        <div className="mt-4">
          <h1>{footer}</h1>
        </div>
      )}
    </div>
  );
};

export default Card;
 */

import type { FC, ReactNode } from "react";

interface CardInterface {
  title?: ReactNode;
  children?: ReactNode; // FIX: Changed from ReactElement to ReactNode to support fragments, text nodes, and list maps smoothly
  footer?: ReactNode;
  divider?: boolean;
  noPadding?: boolean; // NEW: Flag to control internal body layout bleed
  className?: string;
}

const Card: FC<CardInterface> = ({
  title,
  children,
  footer,
  divider = false,
  noPadding = false, // Defaults to standard padding behavior
  className = "",
}) => {
  return (
    // FIX: Combined styles into a dynamic flex column that prevents horizontal box bleeding (min-w-0 overflow-hidden)
    <div
      className={`shadow-lg rounded-xl border border-gray-100 flex flex-col bg-white w-full min-w-0 overflow-hidden ${className}`}>
      {/* HEADER SECTION */}
      {title && (
        <div className="px-5 py-4 shrink-0">
          <h1 className="text-lg font-bold text-slate-800 capitalize tracking-tight">
            {title}
          </h1>
        </div>
      )}

      {/* DIVIDER ACCORDANCE BOUNDS */}
      {divider && <div className="border-b border-gray-100 -mt-2" />}

      {/* BODY CONTENT AREA */}
      {children && (
        <div
          className={`flex-1 min-w-0 text-gray-500 w-full ${
            noPadding ? "p-0" : "px-5 py-4"
          }`}>
          {children}
        </div>
      )}

      {/* FOOTER SECTION */}
      {footer && (
        <div className="mt-auto px-5 py-4 border-t border-gray-50 shrink-0">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;