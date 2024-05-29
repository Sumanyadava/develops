import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie'

const Login = ({ role, setRole }) => {
  const [eye, setEye] = useState("password");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRoleLogin,setUSerRoleLogin] = useState(0)
  

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('userDATA')) {
      navigate('/dashboard')
    }
  })

  const handleshow = () => {
    if (eye === "password") {
      setEye("text");
    } else {
      setEye("password");
    }
  };

  const handleRadio = (e) => {
    const val = e.target.value;
    if (val == "employeeRadio") {
      setUserEmail("employee@132");
      setUSerRoleLogin(1);
      setUserPassword("emp12345");
    } else if (val == "hrRadio") {
      setUserEmail("hremp@123");
      setUSerRoleLogin(2);
      setUserPassword("hremp@123");
    } else if (val == "adminRadio") {
      setUserEmail("admin@123");
      setUSerRoleLogin(3);
      setUserPassword("admin123");
    }
  };
  const handleSubmitSign = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/api/auth/login", {
        email: userEmail,
        password: userPassword,
        userRole:userRoleLogin
      },{
        withCredentials:true
      })
      .then((res) => {
        console.log(res);
        toast.success("Login Successfull");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err.response.data.error);
      });

      
  };
  return (
    <div className="flex h-full w-full text-black">
      <div className="login_pict h-full bg-[#6ce1ca] w-[50%] hidden sm:block"></div>
      <div className="login_message bg-base-100 w-full sm:w-[50%] flex items-center justify-evenly flex-col shadow-md">
        <div className="fake_login bg-base-300 rounded-xl h-[150px] w-[350px] flex justify-center flex-col p-5">
          <h1 className="text-xl">Login as a </h1>
          {/* ------------form starts ----- */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Employee</span>
              <input
                type="radio"
                name="radio-10"
                value="employeeRadio"
                className="radio checked:bg-red-500"
                onChange={(e) => handleRadio(e)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Hr </span>
              <input
                type="radio"
                name="radio-10"
                value="hrRadio"
                className="radio checked:bg-blue-500"
                onChange={(e) => handleRadio(e)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Admin</span>
              <input
                type="radio"
                name="radio-10"
                value="adminRadio"
                className="radio checked:bg-yellow-500"
                onChange={(e) => handleRadio(e)}
              />
            </label>
          </div>
          {/* --------form ends ---- */}
        </div>
        <div className="login_container bg-base-300  h-[500px] w-[350px] rounded-md p-2">
          <h2 className="font-bold font-lobs text-5xl p-3">Welcome back !</h2>

          <form
            action=""
            className="p-3 h-[90%] w-full flex flex-col justify-around "
            onSubmit={handleSubmitSign}
          >
            <input
              type="email"
              autoComplete="on"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
              className="bg-inherit border-b-2 border-gray-400 focus:border-black outline-none text-black font-Robo p-2"
            />
            <select
              name="userRole"
              id="userRole"
              value={userRoleLogin}
              onChange={(e) => {
                setUSerRoleLogin(e.target.value);
              }}
              className="bg-inherit border-b-2 border-gray-400 focus:border-black outline-none text-black font-Robo p-2"
            >
              <option value="0" hidden className="label-text">
                select you role
              </option>
              <option value="1">Employee</option>
              <option value="2">Hr</option>
              <option value="3">Admin</option>
            </select>
            <div className="pass relative">
              <input
                type={eye}
                value={userPassword}
                autoComplete="on"
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
                className="bg-inherit w-full border-b-2 border-gray-400 focus:border-black outline-none p-2 text-black font-Robo"
              />
              <i
                className="absolute right-4 top-2 cursor-pointer"
                onClick={handleshow}
              >
                eye
              </i>
            </div>
            <button className="btn" type="submit">
              Login
            </button>
            <button
              type="reset"
              className="btn border-black text-black hover:bg-gray-100 "
              onClick={() => {
                setUserEmail("");
                setUSerRoleLogin('null');
                setUserPassword("");
              }}
            >
              Reset
            </button>
            {/* <p className="text-center text-gray-400">
              Forgot Password{" "}
              <Link to="/signin" className="text-black underline">
                Click here
              </Link>
            </p> */}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
