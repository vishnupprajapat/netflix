"use client";
import Link from "next/link";
import React from "react";

const NavbarItem = ({ label, active, href }) => {
  return (
    <Link
      className={
        active
          ? "text-white cursor-default"
          : "text-gray-200 hover:text-gray-300 cursor-pointer transition"
      }
      href={href}
    >
      {label}
    </Link>
  );
};
export default NavbarItem;
