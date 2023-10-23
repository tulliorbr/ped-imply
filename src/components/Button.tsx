import React, { HtmlHTMLAttributes } from "react";

interface IButton extends HtmlHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, ...rest }: IButton) {
  return (
    <button
      {...rest}
      className="bg-buttonColor text-white w-full text-center font-bold rounded-[4px] p-2 mt-2"
    >
      {label}
    </button>
  );
}
