import Link from "next/link";
import React from "react";
import { MdMovieEdit } from "react-icons/md";

const Sidebar = () => {
  return (
    <aside className="relative overflow-hidden flex flex-col bg-clip-border top-20 rounded-xl bg-white text-gray-700  w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <Link
          href={"/admin"}
          className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
        >
          <div className="grid place-items-center mr-3 ">
            <MdMovieEdit size={20} />
          </div>
          Add Movise
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
