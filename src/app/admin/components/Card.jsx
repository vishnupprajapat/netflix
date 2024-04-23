import React from "react";
import Link from "next/link";
const Card = ({ title, href, count }) => {
  return (
    <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
      <div className="flex justify-between mb-6">
        <div>
          <div className="flex items-center mb-1">
            <div className="text-2xl font-semibold">{count}</div>
          </div>
          <div className="text-sm font-medium text-gray-400">{title}</div>
        </div>
        <div className="dropdown">
          {/* <button
            type="button"
            className="dropdown-toggle text-gray-400 hover:text-gray-600"
          >
            Click
          </button>
          <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
            <li>
              <a
                href="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                Logout
              </a>
            </li>
          </ul> */}
        </div>
      </div>

      <Link
        href={`${href}`}
        className="text-[#f84525] font-medium text-sm hover:text-red-800"
      >
        View
      </Link>
    </div>
  );
};

export default Card;
