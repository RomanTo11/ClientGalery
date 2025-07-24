import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RegisterButton({ children, ...props }: ButtonProps) {
  return (
    <button
      className="cursor-pointer bg-gray-950 text-white px-6 py-2 rounded hover:bg-gray-700 transition border-2 border-transparent"
      {...props}
    >
      {children}
    </button>
  );
}

export function LoginButton({ children, ...props }: ButtonProps) {
  return (
    <button
      className="cursor-pointer border-2 border-amber-950 px-6 py-2 rounded text-amber-950 hover:bg-amber-950 hover:text-white transition"
      {...props}
    >
      {children}
    </button>
  );
}