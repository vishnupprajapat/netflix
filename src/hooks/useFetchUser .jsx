import axios from "axios";
import { useState, useEffect } from "react";

const useFetchUser = (url) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(url);
        const userData = response.data;
        setUser({ ...userData });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [url]);

  return { user, loading, error };
};

export default useFetchUser;
