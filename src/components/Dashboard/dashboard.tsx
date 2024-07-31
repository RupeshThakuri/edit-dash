import Cards from "./Cards";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col justify-evenly">
        <h2 className="font-bold">Dashboard</h2>
        <Cards />
      </div>
    </>
  );
};

export default Dashboard;
