"use client";
import React from "react";
import UserContext from "@/context/userContext";
import axios from "axios";

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/currentUser");
        const userData = response.data;
        setUser({ ...userData });
      } catch (error) {
        // console.error("Error fetching user:", error);
      }
    };
    setTimeout(() => {
      fetchUser();
    }, 2000);
  }, []); // Empty dependency array to run the effect only once
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
