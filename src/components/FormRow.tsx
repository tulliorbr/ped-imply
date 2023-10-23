import React, { ReactNode } from "react";

interface IFormRow {
  children: ReactNode;
}

export default function FormRow({ children }: IFormRow) {
  return <div className="flex flex-col sm:flex-row sm:gap-4">{children}</div>;
}
