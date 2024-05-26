import React, { useState } from "react";
import Header from "../components/Header";
import EmployeeHome from "./emloyee/EmployeeHome";

const Home = ({ role }) => {
  return (
    <div className="bg-base-200 h-screen">
      
      {/* --------------main start from here ----------------------------- */}

      <main>
        <EmployeeHome />
      </main>
    </div>
  );
};

export default Home;
