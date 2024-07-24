import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Theme from "./Theme";
import NotAuth from "./NotAuth";
import Cookies from "universal-cookie";

const Header = ({ role, setRole, userNameCookie , setJwtToken }) => {
  const navigateg = useNavigate();
  const cookies = new Cookies();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "cupcake"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localtheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localtheme);
  }, [theme]);

  return (
    <div className="">
      {role === "0" || role == undefined ? (
        ""
      ) : (
        <header className="header ">
          <nav className="navbar bg-base-100 flex flex-col sm:flex-row">
            <div className="flex-1">
              <Theme theme={theme} setTheme={setTheme} />
              <a className="btn btn-ghost text-xl">
                Attendance Portal -<div className="user">{userNameCookie}</div>
              </a>
            </div>
            <div className="flex-1 justify-end gap-2  text-sm flex-wrap sm:justify-end">
              {role === "1" ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({isActive}) => `btn btn-ghost link text-sm "   ${!isActive ? "" : "bg-red-500 hover:bg-red-400"}`}
                    
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/attendance"
                    className={({isActive}) => `btn btn-ghost link"   ${!isActive ? "" : "bg-red-500 hover:bg-red-400"}`}
                  >
                    Attendance
                  </NavLink>
                </>
              ) : role === "2" ? (
                <>
                  <NavLink to="/dashboard" className={({isActive}) => `btn btn-ghost link"   ${!isActive ? "" : "bg-red-500 hover:bg-red-400"}`}>
                    Hr Dashboard
                  </NavLink>
                  <NavLink to="/attendance" className={({isActive}) => `btn btn-ghost link"   ${!isActive ? "" : "bg-red-500 hover:bg-red-400"}`}>
                    Attendance
                  </NavLink>
                  <NavLink to="/attendancereport" className={({isActive}) => `btn btn-ghost link"   ${!isActive ? "" : "bg-red-500 hover:bg-red-400"}`}>
                    Attendance Report
                  </NavLink>
                </>
              ) : role === "3" ? (
                <>
                  <NavLink to="/dashboard" className={({isActive}) => `btn btn-ghost link"   ${!isActive ? "" : "bg-red-500 hover:bg-red-400"}`}>
                    Admin Dashboard
                  </NavLink>
                  <NavLink to="/signin" className={({isActive}) => `btn btn-ghost link"   ${!isActive ? "" : "bg-red-500 hover:bg-red-400"}`}>
                    Add User
                  </NavLink>
                  <NavLink to="/attendancereport" className={({isActive}) => `btn btn-ghost link"   ${!isActive ? "" : "bg-red-500 hover:bg-red-400"}`}>
                    View User
                  </NavLink>
                </>
              ) : null}

              <div className="dropdown dropdown-end">
                <button
                  className="btn btn-accent mr-5"
                  onClick={() => {
                    cookies.remove("jwt_auth", { path: '/' })
                    navigateg("/");
                    setRole(0);
                    setJwtToken(null)
                    
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </header>
      )}
    </div>
  );
};

export default Header;
