import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import NotAuth from "../components/NotAuth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const EmployeeList = ({ role, emailCookie }) => {
  const [allTable, setAllTable] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const allUser = async () => {
      try {
        const res = await axios.get("https://develops.vercel.app/api/auth/all");
        // filter the self user 
        const filteredData = res.data.filter((user) => user.email !== emailCookie);
        setAllTable(filteredData);
        setFilteredData(filteredData)
      } catch (error) {
        console.log("error here ", error);
      }
    };

    allUser();
  }, [emailCookie]);

  const handleViewAttendance = (email) => {
    navigate(`/attendance?email=${email}`);
  };

  const handleDelete = async (email) => {
    console.log(email);
    try {
      const res = await axios.delete("https://develops.vercel.app/api/auth/delete", {
        data:{email},
      });
      console.log(res.data);
      toast.success(res.data.message)
    } catch (error) {
      console.error("Error deleting user here :", error);
    }
  }; 
  const handleEdit = (email) => {
    navigate(`/signin?email=${email}`)
  }

  const handleSearch = () => {
    const filterData = allTable.filter((user) => 
      user.username.toLowerCase().includes(search.toLocaleLowerCase())
    )
    setFilteredData(filterData)
  }

  return (
    <div>
      {role == 1 ? (
        <>
          <NotAuth />
        </>
      ) : (
        <>
          <main className="">
            <div className="data_show flex m-4 gap-4 p-4 border-b-4 ">
              <label className="input input-bordered flex items-center gap-2 border border-b-4">
                <input type="text" className="grow" placeholder="Search name" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

              <button className="btn" onClick={handleSearch} >search</button>
            </div>

            <div className="report">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Employee Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                      
                      {role == 3 ? (
                        <>
                          <th>Edit </th>
                          <th>Delete</th>
                        </>
                      ) : (
                        ""
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((ele, index) => {
                      const name = ele.username;
                      const email = ele.email;
                      const roletable = ele.userRole;

                      return (
                        <tr key={ele._id}>
                          <td>{index + 1}</td>
                          <th>{name}</th>
                          <td>{email}</td>
                          <td>
                            {roletable == 1
                              ? "Employee"
                              : roletable == 2
                              ? "HR"
                              : roletable == 3
                              ? "Admin"
                              : "null"}
                          </td>
                          
                          <td>
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleViewAttendance(email)}
                            >
                              view Attendance
                            </button>
                          </td>
                          {role == 3 ? (
                            <>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleEdit(email)}
                                >
                                  Edit
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleDelete(email)}
                                >
                                  Delete
                                </button>
                              </td>
                            </>
                          ) : (
                            ""
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;
