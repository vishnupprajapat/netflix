"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

const tableheader = [
  "Movie name",
  "Description",
  "Genre",
  "Duration",
  "Action",
];

const Page = () => {
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/movies");
        const movieData = response.data.movies;
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchMovies();
    }, 2000);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>; // Render loading message while fetching data
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 p-4 sm:space-y-0 items-center justify-between pb-4">
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
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>

              {tableheader.map((item) => (
                <th key={item} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr
                key={movie.title}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${movie.title}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${movie.title}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {movie.title}
                </td>
                <td className="px-6 py-4">{movie.description}</td>
                <td className="px-6 py-4">{movie.genre}</td>
                <td className="px-6 py-4">{movie.duration}</td>
                <td className="px-6 py-4 flex ">
                  <button className="font-medium mr-7 text-blue-600 dark:text-blue-500 hover:underline">
                    <AiOutlineEdit size={20} />
                  </button>
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
