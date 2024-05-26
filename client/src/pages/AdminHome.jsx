import React from "react";
import Header from "../components/Header";
import NotAuth from "../components/NotAuth";

const AdminHome = ({ role }) => {
  return (
    <div>
      {role == 3 ? (
        <>
          
          <div className="button_wrapper">
            <div className="view text-9xl text-center mt-20">
              Welcome Admin:
            </div>
          </div>
        </>
      ) : (
        <>
        <NotAuth />
        </>
      )}
    </div>
  );
};

export default AdminHome;
