"use client";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";
export default function Admin() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/movies", {
          cache: "no-store",
        });
        const movieData = response.data.movies;
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovies([]);
      }
    })();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card title="user" href="/admin/users" count="14" />
        <Card title="Movies" href="/admin/movies  " count={movies.length} />
      </div>
    </>
  );
}
