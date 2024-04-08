import axios from "axios";
import { useState, useEffect } from "react";

const useFetchAdminUser = (url) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(url);
        const userData = response.data;
        setAdmin({ ...userData });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [url]);

  return { admin, loading, error };
};

export default useFetchAdminUser;
