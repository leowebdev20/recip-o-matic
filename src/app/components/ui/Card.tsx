import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
