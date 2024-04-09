"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import TableTopHeader from "../components/TableTopHeader";

const tableheader = [
  "Movie name",
  "Description",
  "Genre",
  "Duration",
  "Action",
];

const Page = () => {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [movies, setMovies] = useState([]);
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
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = movies?.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableTopHeader numSelected={selected.length} />
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    indeterminate={
                      selected.length > 0 && selected.length < movies.length
                    }
                    checked={
                      movies.length > 0 && selected.length === movies.length
                    }
                    onChange={handleSelectAllClick}
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
            {movies.map((movie) => {
              const { title, description, genre, duration } = movie;
              const selectedMovie = selected.indexOf(title) !== -1;
              return (
                <tr
                  key={title}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${title}`}
                        type="checkbox"
                        checked={selectedMovie}
                        onChange={(event) => handleClick(event, title)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`checkbox-table-search-${title}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {title}
                  </td>
                  <td className="px-6 py-4">{description}</td>
                  <td className="px-6 py-4">{genre}</td>
                  <td className="px-6 py-4">{duration}</td>
                  <td className="px-6 py-4 flex ">
                    <button className="font-medium mr-7 text-blue-600 dark:text-blue-500 hover:underline">
                      <AiOutlineEdit size={20} />
                    </button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
