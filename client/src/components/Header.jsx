import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Theme from "./Theme";
import NotAuth from "./NotAuth";

const Header = ({ role, setRole }) => {
  const navigateg = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") :  "cupcake")

  useEffect(() => {
    localStorage.setItem("theme",theme)
    const localtheme = localStorage.getItem("theme")
    document.querySelector('html').setAttribute('data-theme',localtheme)
  }, [theme])
  
  return (
    <div className="">
      {role == 0 ? (
        ""
      ) : (
        <header className="header ">
          <navbar className="navbar bg-base-100 flex flex-col sm:flex-row">
            <div className="flex-1">
              <Theme theme={theme}setTheme={setTheme}/>
              <a className="btn btn-ghost text-xl">
                Attendance Portal -<div className="user">Employee Name</div>
              </a>
            </div>
            <div className="flex-1 justify-end">
              {role === 1 ? (
                <>
                  <Link to="/dashboard" className="btn btn-ghost link">
                    Dashboard
                  </Link>
                  <Link to="/attendance" className="btn btn-ghost link">
                    Attendance
                  </Link>
                </>
              ) : role === 2 ? (
                <>
                  <Link to="/dashboard" className="btn btn-ghost link">
                    Hr Dashboard
                  </Link>
                  <Link to="/attendance" className="btn btn-ghost link">
                    Attendance
                  </Link>
                  <Link to="/attendancereport" className="btn btn-ghost link">
                    Attendance Report
                  </Link>
                </>
              ) : role === 3 ? (
                <>
                <Link to="/dashboard" className="btn btn-ghost link">
                    Admin Dashboard
                  </Link>
                  <Link to="/signin" className="btn btn-ghost link">
                    Add User
                  </Link>
                  <Link to="/attendancereport" className="btn btn-ghost link">
                    View User
                  </Link>
                </>
              ) : null}

              <div className="dropdown dropdown-end">
                <button
                  className="btn btn-accent mr-5"
                  onClick={() => {
                    setRole(0);
                    navigateg("/login");
                  }}
                >
                  <Link to="/login"> Logout</Link>
                </button>
              </div>
            </div>
          </navbar>
        </header>
      )}
    </div>
  );
};

export default Header;
