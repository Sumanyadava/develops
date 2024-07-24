import React from "react";
import NotAuth from "../components/NotAuth";

const AdminHome = ({ role }) => {
  return (
    <div>
      {role == 3 ? (
        <>
          
          <div className="button_wrapper">
            <div className="view text-2xl text-center mt-20 sm:text-9xl">
              Welcome Admin:
            </div>
          </div>
        </>
      ) : (
        <>
        <NotAuth />
        {role} asdasdasd
        </>
      )}
    </div>
  );
};

export default AdminHome;
