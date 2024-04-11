import axios from "axios";
import { useState, useEffect } from "react";

const useFetchMovies = (url) => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url);
        const moviesData = response.data.movies;
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [url]);

  return { movies, loading, error, setMovies };
};

export default useFetchMovies;
