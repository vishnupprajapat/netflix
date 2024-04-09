import React from "react";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const TableTopHeader = ({ numSelected }) => {
  const router = useRouter();
  return (
    <div
      className={`flex flex-column ${
        numSelected > 0 ? " bg-blue-200" : ""
      } sm:flex-row flex-wrap space-y-4 p-4 sm:space-y-0 items-center justify-between pb-4`}
    >
      {numSelected > 0 ? (
        <>
          <div className="p-2 text-blue-500">{numSelected} selected</div>
          <button className="">
            <MdDelete size={20} />
          </button>
        </>
      ) : (
        <>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlassIcon size={100} />
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
          <div>
            <button
              onClick={() => router.push("/admin/addMovie")}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <IoMdAdd size={20} />
              <span className="ml-2">Add Movie</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TableTopHeader;
