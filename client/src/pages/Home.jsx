import React, { useState } from "react";
import Header from "../components/Header";
import EmployeeHome from "./emloyee/EmployeeHome";

const Home = ({ role,emailCookie }) => {
  return (
    <div className="bg-base-200 h-screen w-full">
      
      {/* --------------main start from here ----------------------------- */}

      <main>
        <EmployeeHome emailCookie={emailCookie} />
      </main>
    </div>
  );
};

export default Home;
