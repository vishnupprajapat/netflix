"use client";
import React from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/admin/currentUser");
        const userData = response.data;
        setUser({ ...userData });
      } catch (error) {
        console.log("Error fetching user:");
      }
    };
    setTimeout(() => {
      fetchUser();
    }, 2000);
  }, []); // Empty dependency array to run the effect only once
  // console.log(user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
