import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarHeader from "../components/sidebar/SidebarHeader";
import DesbordContent from "../dasbordContent/DesbordContent";

const Dashboard = () => {
  return (
    <div className="h-full relative ">
      <SidebarHeader />
      <div className="flex min-h-screen flex-row">
        <Sidebar />
        <DesbordContent />
      </div>
    </div>
  );
};

export default Dashboard;
