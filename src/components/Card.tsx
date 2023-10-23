'use client'
import React, { ReactNode, useEffect, useState } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hasPadding?: boolean;
}

export default function Card({ children, hasPadding = true }: CardProps) {
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCardVisible(true);
    }, 200);
  }, []);

  return (
    <div
      className={`${isCardVisible ? "opacity-100" : "opacity-0"} ${
        hasPadding ? "px-[35px] py-[27px]" : ""
      } transition-opacity duration-300 ease-linear bg-white shadow-lg rounded-md `}
    >
      {children}
    </div>
  );
}
