import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
    to: string;
    children: React.ReactNode;
    variant?: "default" | "underline";
}

const navItemBase =
    "font-semibold text-gray-600 tracking-wide hover:text-amber-950 transition";

const navItemUnderline =
    "relative before:absolute before:left-0 before:-bottom-1 before:w-full before:h-0.5 before:bg-amber-950 before:scale-x-0 before:origin-left before:transition-transform before:duration-200 hover:before:scale-x-100";

const NavItem: React.FC<NavItemProps> = ({ to, children, variant = "default" }) => (
    <li>
        <Link
            to={to}
            className={`${navItemBase} ${variant === "underline" ? navItemUnderline : ""}`}
        >
            {children}
        </Link>
    </li>
);

export default NavItem;
