import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CustomButton({ children, ...props }: ButtonProps) {
  return (
    <button
      className="relative border-2 border-amber-950 px-6 py-2 rounded text-amber-950 overflow-hidden flex items-center gap-2 group"
      {...props}
    >
      <span className="absolute left-0 top-0 h-full w-0 bg-amber-200 opacity-50 group-hover:w-full transition-all duration-400"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}