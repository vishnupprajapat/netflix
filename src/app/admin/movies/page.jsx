"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import TableTopHeader from "../components/TableTopHeader";
// import useFetchMovies from "@/hooks/useFetchMovies";

const tableheader = [
  "Movie name",
  "Description",
  "Genre",
  "Duration",
  "Action",
];

const Page = () => {
  const [selected, setSelected] = useState([]);
  const [Id, setId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  // const { movies, loading, setMovies } = useFetchMovies("/api/movies");
  // console.log();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = movies?.map((n) => n.title);
      const newSelectedsId = movies?.map((n) => n._id);
      setSelected(newSelecteds);
      setId([...newSelectedsId]);
      return;
    }
    setId([]);
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    let newId = [...Id]; // Create a copy of Id array

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newId.push(id); // Add id to Id array if checkbox is selected
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      const indexToRemove = newId.indexOf(id);
      if (indexToRemove !== -1) {
        newId.splice(indexToRemove, 1); // Remove id from Id array if checkbox is unselected
      }
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      const indexToRemove = newId.indexOf(id);
      if (indexToRemove !== -1) {
        newId.splice(indexToRemove, 1); // Remove id from Id array if checkbox is unselected
      }
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      const indexToRemove = newId.indexOf(id);
      if (indexToRemove !== -1) {
        newId.splice(indexToRemove, 1); // Remove id from Id array if checkbox is unselected
      }
    }
    setSelected(newSelected);
    setId(newId); // Update Id array
  };

  // delete
  const handleRemove = async (id) => {
    try {
      await axios.delete("/api/admin/movies/deleteMovie", {
        data: { id },
      });
      setSelected([]);
      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllselected = async () => {
    try {
      await axios.delete("/api/admin/movies/deleteMovie", {
        data: { Id },
      });
      setMovies(movies.filter((movie) => !Id.includes(movie._id)));
      setSelected([]);
      setId([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/movies", { cache: "no-store" });
        const movieData = response.data.movies;
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovies([]);
      }
    })();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableTopHeader
          numSelected={selected.length}
          handleRemoveAllselected={handleRemoveAllselected}
        />
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
                        ? "true"
                        : undefined
                    }
                    checked={
                      movies?.length > 0 && selected.length === movies?.length
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
            {movies?.map((movie) => {
              const { title, description, genre, duration, _id } = movie;
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
                        onChange={(event) => handleClick(event, title, _id)}
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
                      <MdDelete onClick={() => handleRemove(_id)} size={20} />
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
