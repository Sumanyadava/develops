import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import NotAuth from "../components/NotAuth";

const EmployeeList = ({ role }) => {
  const navigate = useNavigate()
  const dam = 123

  const handleViewAttendance = () => {
    navigate('/attendance?id='+ dam)
  }
  return (
    <div>

      {
        role == 1 ? (<><NotAuth/></>) : (<>
        
      <main className="">
        <div className="data_show flex m-4 gap-4 p-4 border-b-4 ">
          <label className="input input-bordered flex items-center gap-2 border border-b-4">
            <input type="text" className="grow" placeholder="Search" />
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

          <button className="btn">search</button>
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
        <th>Action</th>
        {
          role == 3 ? (
            <>
            <th>Edit </th>
            <th>Delete</th>
            </>
          ) : ""
        }
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality@gmail.com</td>
        <td>
          <button className="btn btn-secondary" onClick={handleViewAttendance}>
            view Attendance
          </button>
        </td>
        {
          role == 3 ? (
            <>
            <td>
          <button className="btn btn-primary" onClick={handleViewAttendance}>
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-primary" onClick={handleViewAttendance}>
            Delete
          </button>
        </td>
            </>
          ) : ""
        }
      </tr>
      {/* row 2 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality@gmail.com</td>
        <td>
          <button className="btn btn-secondary" onClick={handleViewAttendance}>
            view Attendance
          </button>
        </td>
        {
          role == 3 ? (
            <>
            <td>
          <button className="btn btn-primary" onClick={handleViewAttendance}>
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-primary" onClick={handleViewAttendance}>
            Delete
          </button>
        </td>
            </>
          ) : ""
        }
      </tr>
      
    </tbody>
  </table>
</div>


        </div>
      </main>
      
      </>)
      }
      
    </div>
  );
};

export default EmployeeList;
