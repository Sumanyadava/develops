import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Signup = ({ role }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState(1);
  const [workingHour, setWorkingHour] = useState("");
  const [eye, setEye] = useState("password");
  const [passVal, setpassVal] = useState("text-red-300");

  const [searchParams] = useSearchParams();
  const userEmailSearch = searchParams.get("email");

  const navigate = useNavigate();

  useEffect(() => {

    //filling the fields with user data
    axios
      .get("http://localhost:3002/api/auth/single", {
        headers: {
          email: userEmailSearch,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUserName(res.data?.username);
        setUserEmail(res.data?.email);
        setUserPassword("");
        setUserRole(res.data?.userRole);
        setWorkingHour(res.data?.workingHours);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShow = () => {
    if (eye === "password") {
      setEye("text");
    } else {
      setEye("password");
    }
  };

  const handlePass = (e) => {
    let passdigit = e.target.value;
    setUserPassword(passdigit);

    if (passdigit.length >= 8) {
      setpassVal("text-green-300");
    } else {
      setpassVal("text-red-300");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userName.trim().length <= 2 ||
      userEmail.trim() == "" ||
      userPassword.trim().length < 8
    ) {
      toast.error("Please fill all the fields");
    } else {
      axios.post("http://localhost:3002/api/auth/signin", {
          name: userName,
          email: userEmail,
          password: userPassword,
          userRole: userRole,
          workingHours: workingHour,
        })
        .then((data) => {
          toast.success("Signup Success");
          // console.log(userName, userEmail, userPassword);
          setUserName("");
          setUserEmail("");
          setUserPassword("");
          setUserRole(1);
          setWorkingHour("");
        })
        .catch((err) => {
          console.log(err);
          toast.error("user already exsist");
        });

      
      console.log(userName, userEmail, userPassword, userRole);
    }
  };
  const handleEdit = () => {
    e.preventDefault();
    console.log("edit");
    try {
      axios
      .put("http://localhost:3002/api/auth/singleedit", {
        name: userName,
        email: userEmail,
        password: userPassword,
        userRole: userRole,
        workingHours: workingHour,
      })
      .then((data) => {
        toast.success("edited successful");
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setUserRole(1);
        setWorkingHour("");
      })
      .catch((err) => console.error(err));
    } catch (error) {
      toast.error("error")
    }
    
  };

  return (
    <>
      <div className="flex h-full w-full text-black">
        <div className="signup_message bg-base-300 w-full sm:w-[50%] flex items-center justify-center">
          <div className="signup_container bg-base-100 h-[650px] w-[400px] rounded-md">
            <form
              action=""
              className="w-full h-full flex flex-col p-5"
              onSubmit={userEmailSearch ? handleEdit : handleSubmit}
            >
              <label className="form-control w-full ">
                <div className="label">
                  <span className="">Employee name</span>
                </div>
                <input
                  type="text"
                  placeholder="Name here"
                  required
                  className="input input-bordered w-full bg-white "
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </label>

              <label className="form-control w-full mt-2">
                <div className="label">
                  <span className="">Employee email </span>
                </div>
                <input
                  type="email"
                  placeholder="Email here"
                  className="input input-bordered w-full  bg-white"
                  required
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                />
              </label>

              <label className="form-control w-full mt-2">
                <div className="label">
                  <span className="">Employee role </span>
                </div>
                <select
                  name="userRegister"
                  id="userRegister"
                  value={userRole}
                  onChange={(e) => {
                    console.log(userRole);
                    setUserRole(e.target.value);
                  }}
                  className="input input-bordered w-full  bg-white"
                >
                  <option value="1">Employee</option>
                  <option value="2">Hr</option>
                  <option value="3">Admin</option>
                </select>
              </label>

              <label className="form-control w-full mt-2">
                <div className="label">
                  <span className="">Employee working hour </span>
                </div>
                <input
                  type="number"
                  name=""
                  id=""
                  value={workingHour}
                  className="input input-bordered w-full bg-white"
                  onChange={(e) => setWorkingHour(e.target.value)}
                />
              </label>

              <label className="form-control w-full mt-2 relative">
                <div className="label">
                  <span className="">Write a password</span>
                  <span
                    className="label-text-alt cursor-pointer"
                    onClick={handleShow}
                  >
                    eye
                  </span>
                </div>

                <input
                  type={eye}
                  placeholder="Type here"
                  required
                  disabled={Boolean(userEmailSearch)}
                  className="peer input input-bordered w-full bg-white "
                  value={userPassword}
                  onChange={handlePass}
                />

                <span
                  className={`invisible peer-focus:visible pl-2 pt-2 label-text-alt  ${passVal}`}
                >
                  password must be 8 character long
                </span>
              </label>

              <button className="btn mt-9" type="submit">
                {userEmailSearch ? "edit user" : "Register user"}
              </button>
              {userEmailSearch && (
                <button
                  className="btn mt-2"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  cancel
                </button>
              )}

              <ToastContainer />

              {/* <p className=" text-center mt-2">
                Go Back?{" "}
                <Link to="/dashboard" className="underline font-bold">
                  Dashboard
                </Link>
              </p> */}
            </form>
          </div>
        </div>

        <div className="signup_pict h-full bg-[#6ce1ca] w-[50%] hidden sm:block">
          {}
        </div>
      </div>
    </>
  );
};

export default Signup;
