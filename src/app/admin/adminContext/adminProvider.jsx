"use client";
import React from "react";
import AdminContext from "./adminContext";
import axios from "axios";

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = React.useState();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/admin/currentUser");
        const userData = response.data;
        setAdmin({ ...userData });
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
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
